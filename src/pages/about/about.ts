import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var async_load;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    console.log("about.html");

    //if (Window.attachEvent) { window.attachEvent('onload', async_load); }
    // else { window.addEventListener('load', async_load, false); }
    window.addEventListener('load', async_load, false);
  }

}
