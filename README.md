DreamHouse Web アプリ
------------------
このサンプリアプリは、Heroku上で実行され、オプションでHeroku Connectを使用して Salesforceからデータを取得する
[DreamHouse](http://www.dreamhouseappjp.io/) に対応したモバイルWebアプリです。デモをご覧ください。

[![Demo](http://img.youtube.com/vi/sSoUGkqveMo/0.jpg)](http://www.youtube.com/watch?v=sSoUGkqveMo)

このアプリは ionic と Node.js で開発されており、ローカルでも Heroku でもカンタンに実行できます。

ローカルで実行する場合:

1. [Postgres をインストールして開始します](https://lets.postgresql.jp/map/install)
1. [Node.js をインストールします](https://nodejs.org/ja/)
1. Postgres でデータベースを作成し、`dreamhouse` という名前をつけます
1. NPM 依存関係をフェッチします。`npm install`
1. アプリを起動します `npm run dev`
1. アプリを確認します [http://localhost:8200/](http://localhost:8200/)

Heroku で実行する場合:

1. [![Deploy on Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/dreamhouseapp/dreamhouse-web-app)
1. アプリを確認します `http://<YOUR APP NAME>.herokuapp.com`

Heroku Connect を使う場合:

1. [Salesforce Developer Edition 組織にサインアップします](https://developer.salesforce.com/signup)
1. [Dreamhouse パッケーを組織へインストールします](http://www.dreamhouseappjp.io/installation/)
1. [Heroku Connect アドオンを Heroku アプリに追加します](https://elements.heroku.com/addons/herokuconnect)
1. Heroku Connect をセットアップします。Heroku アプリの管理ダッシュボードの［Resources］タブの［*Heroku Connect*］をクリックします `https://dashboard.heroku.com/apps/YOUR_APP_NAME/resources`
1. `Property__c` を読み込み専用でマッピングへ追加します。マッピング対象のフィールドは次の通り: `address__c, baths__c, beds__c, broker__c, city__c, description__c, location__latitude__s, location__longitude__s, picture__c, price__c, state__c, tags__c, thumbnail__c, title__c`
1. `Broker__c` も同様に読み込み専用で、次のフィールドとともにマッピングを追加します: `email__c, mobile_phone__c, phone__c, picture__c, title__c`
1. `Property_Favorite__c` は双方向の設定でマッピングしますた対象のフィールドは次の通り: `Property__c, User__c`
2. 新しいデータベーステーブルが使用されるように、アプリを再起動します
3. アプリを確認し、Salesforce で物件の価格を変更したときに同期が機能するかどうかを検証します
