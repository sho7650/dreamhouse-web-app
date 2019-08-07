import { Component } from '@angular/core';

declare var window;

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
    constructor() {
        console.log("welcome.html");

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
    }
}
