import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BrokerService } from '../../providers/broker-service-rest';
import { BrokerDetailPage } from '../broker-detail/broker-detail';

declare var piTracker;

@Component({
    selector: 'page-broker-list',
    templateUrl: 'broker-list.html'
})
export class BrokerListPage {

    brokers: Array<any>;

    constructor(public navCtrl: NavController, public service: BrokerService) {
        piTracker(document.URL + "broker-list");
        service.findAll().then(data => this.brokers = data);
    }

    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

}
