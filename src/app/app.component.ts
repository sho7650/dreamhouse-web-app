import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PropertyListPage } from '../pages/property-list/property-list';
import { BrokerListPage } from '../pages/broker-list/broker-list';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        this.appMenuItems = [
            { title: 'ようこそ', component: WelcomePage, icon: 'bookmark' },
            { title: '物件一覧', component: PropertyListPage, icon: 'home' },
            { title: '仲介者一覧', component: BrokerListPage, icon: 'people' },
            { title: 'お気に入り', component: FavoriteListPage, icon: 'star' },
        ];

        this.accountMenuItems = [
            { title: 'プロフィール', component: WelcomePage, icon: 'ios-contact' },
            { title: 'ログアウト', component: AboutPage, icon: 'log-out' },
        ];

        this.helpMenuItems = [
            { title: '事前承認を取得', component: WelcomePage, icon: 'checkmark-circle' },
            { title: 'メルマガ登録', component: AboutPage, icon: 'information-circle' },
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
