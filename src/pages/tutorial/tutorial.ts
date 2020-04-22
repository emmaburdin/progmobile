import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {LoginPage} from "../login/login";

/**
 * Generated class for the TutorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;
  public isFirstStart: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public storage: Storage) {
    this.storage.get("tutorial_done")
      .then((res) => {
        if (res == "true") {
          this.isFirstStart = false;
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
    this.storage.set("tutorial_first", "false");
  }

  goToNextSlide() {
    this.slides.slideNext();
  }

  goToPrevSlide() {
    this.slides.slidePrev();
  }

  goToHome() {
    this.userProvider.userInfo.subscribe
    (
      res => {
        if (res) {
          this.navCtrl.setRoot(HomePage, {}, {
            animate: true,
            direction: 'forward'
          });
        } else {
          this.navCtrl.setRoot(LoginPage, {}, {
            animate: true
          });
        }
      }
    )

    this.storage.set("tutorial_first", "true");
    this.storage.set("tutorial_done", "true");
  }
}
