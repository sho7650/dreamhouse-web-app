import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrokerService } from '../../providers/broker-service-rest';
import { BrokerDetailPage } from '../broker-detail/broker-detail';

declare var window;

@Component({
    selector: 'page-broker-list',
    templateUrl: 'broker-list.html'
})
export class BrokerListPage {

    brokers: Array<any>;

    constructor(public navCtrl: NavController, public service: BrokerService) {
        console.log("broker-list.html");

        (function () {
            console.log("running Pardot tag");
            function async_load() {
                var s = document.createElement('script'); s.type = 'text/javascript';
                s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
                var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c);
            }
            if (window.attachEvent) { window.attachEvent('onload', async_load); }
            else { window.addEventListener('load', async_load, false); }
        })();

        service.findAll().then(data => this.brokers = data);
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

}
