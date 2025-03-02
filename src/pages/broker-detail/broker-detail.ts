import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BrokerService } from '../../providers/broker-service-rest';

declare var interval_id, findTitle, piTracker;

@Component({
    selector: 'page-broker-detail',
    templateUrl: 'broker-detail.html'
})
export class BrokerDetailPage {
    title: string;
    broker: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: BrokerService) {
        this.broker = this.navParams.data;
        document.title = this.broker.name;
        piTracker(`${document.URL}broker-detail/${this.broker.id}`);

        service.findById(this.broker.id).then(
            broker => this.broker = broker
        );
        // interval_id = setInterval(findTitle(document.URL + "broker-detail/" + this.broker.id), 100);
        // setTimeout(piTracker(document.URL + "broker-detail/" + this.broker.id), 1000);
    }

}
