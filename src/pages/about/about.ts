import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var piTracker;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    // piTracker(document.URL + "about");
    // window.location.replace("http://go.pardot.com/l/794053/2019-08-09/56q");
  }

}
