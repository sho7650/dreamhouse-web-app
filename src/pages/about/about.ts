import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var piTracker;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    piTracker(document.URL + "about.html");
  }

}
