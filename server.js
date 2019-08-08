const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());


const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dreamhouse';

if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}

const client = new pg.Client(connectionString);
client.connect();

var propertyTable = 'property__c';
var favoriteTable = 'property_favorite__c';
var brokerTable = 'broker__c';

// generate new random uuid argorithm
// client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');

// setup the demo data if needed
client.query('SELECT * FROM salesforce.broker__c', function (error, data) {
  if (error !== null) {
    client.query('SELECT * FROM broker__c', function (error, data) {
      if (error !== null) {
        console.log('Loading Demo Data...');
        require('./db/demo.js')(client);
        console.log('Done Loading Demo Data!');
      }
    });
  }
  else {
    const schema = 'salesforce.';
    propertyTable = schema + 'property__c';
    favoriteTable = schema + 'property_favorite__c';
    brokerTable = schema + 'broker__c';
  }
});


app.get('/property', function (req, res) {

  const dataToResponse = function (error, data) {
    res.json(data.rows);
  };

  if (req.query.key !== undefined) {
    const pattern = '%' + req.query.key + '%';
    client.query('SELECT * FROM ' + propertyTable + ' WHERE title__c ILIKE $1', [pattern], dataToResponse);
  }
  else {
    client.query('SELECT * FROM ' + propertyTable, dataToResponse);
  }

});

app.get('/property/:sfid', function (req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + brokerTable + '.sfid AS broker__c_sfid, ' + brokerTable + '.name AS broker__c_name, ' + brokerTable + '.email__c AS broker__c_email__c, ' + brokerTable + '.phone__c AS broker__c_phone__c, ' + brokerTable + '.mobile_phone__c AS broker__c_mobile_phone__c, ' + brokerTable + '.title__c AS broker__c_title__c, ' + brokerTable + '.picture__c AS broker__c_picture__c FROM ' + propertyTable + ' INNER JOIN ' + brokerTable + ' ON ' + propertyTable + '.broker__c = ' + brokerTable + '.sfid WHERE ' + propertyTable + '.sfid = $1', [req.params.sfid], function (error, data) {
    res.json(data.rows[0]);
  });
});


app.get('/favorite', function (req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + favoriteTable + '.sfid AS favorite__c_sfid, ' + favoriteTable + '.id__c AS favorite__id FROM ' + propertyTable + ', ' + favoriteTable + ' WHERE ' + propertyTable + '.sfid = ' + favoriteTable + '.property__c', function (error, data) {
    res.json(data.rows);
  });
});

app.post('/favorite', function (req, res) {
  client.query('INSERT INTO ' + favoriteTable + " (id__c, property__c, lead__c) VALUES (gen_random_uuid(), $1, '00Q2v00001VWbzzEAD')", [req.body.property__c], function (error, data) {
    res.json(data);
  });
});

app.delete('/favorite/:id', function (req, res) {
  client.query('DELETE FROM ' + favoriteTable + ' WHERE id__c = $1', [req.params.id], function (error, data) {
    res.json(data);
  });
});


app.get('/broker', function (req, res) {
  client.query('SELECT * FROM ' + brokerTable, function (error, data) {
    res.json(data.rows);
  });
});

app.get('/broker/:sfid', function (req, res) {
  client.query('SELECT * FROM ' + brokerTable + ' WHERE sfid = $1', [req.params.sfid], function (error, data) {
    res.json(data.rows[0]);
  });
});

const port = process.env.PORT || 8200;

app.listen(port);

console.log('Listening at: http://localhost:' + port);
