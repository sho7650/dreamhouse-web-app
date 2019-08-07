import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BrokerService } from '../../providers/broker-service-rest';

declare var window;

@Component({
    selector: 'page-broker-detail',
    templateUrl: 'broker-detail.html'
})
export class BrokerDetailPage {

    broker: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService) {
        console.log("broker-detail.html");

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

        this.broker = this.navParams.data;
        service.findById(this.broker.id).then(
            broker => this.broker = broker
        );
    }

}
