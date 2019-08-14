import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PropertyService } from '../../providers/property-service-rest';
import { PropertyDetailPage } from '../property-detail/property-detail';

declare var piTracker, interval_id, findTitle;

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: PropertyService) {
        document.title = "お気に入りリスト";
        piTracker("/favorite-list");
        // interval_id = setInterval(findTitle(document.URL + "favorite-list"), 100);
        this.getFavorites();
    }

    itemTapped(favorite) {
        this.navCtrl.push(PropertyDetailPage, favorite.property);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => this.favorites = data);
    }

}
