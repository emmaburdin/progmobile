import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import { DailyFormPage } from '../pages/daily-form/daily-form';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {UserProvider} from "../providers/user/user";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public userProvider:UserProvider,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public storage:Storage) {
    this.storage.ready().then(() => {
      this.storage.get("tutorial_done")
          .then((res) =>{
            if(res != "true"){
              this.rootPage = TutorialPage;
            }
            else{
              this.rootPage = LoginPage;
              //this.rootPage = DailyFormPage;
            }
            this.initializeApp();
          })
          .catch(_ => this.initializeApp());
    });


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Tutorial', component: TutorialPage},
      { title: 'Nouvel Enregistrement', component: DailyFormPage}
    // { title: 'Nouvel Enregistrement', component: DailyFormPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOutUser() {
    this.userProvider.logout()
      .then(() => {this.nav.setRoot(LoginPage)})
      .catch((err) => alert("Erreur de connexion"))
  }
}
