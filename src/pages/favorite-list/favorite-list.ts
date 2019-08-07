import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PropertyService } from '../../providers/property-service-rest';
import { PropertyDetailPage } from '../property-detail/property-detail';

declare var window;

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: PropertyService) {
        console.log("favorite-list.html");

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
