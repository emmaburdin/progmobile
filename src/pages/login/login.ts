import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loader:any;
  public UserInfoReady : Boolean = false;
  public UserNotConnected : Boolean = false;

  constructor(public navCtrl: NavController,
              public userProvider:UserProvider,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    this.userProvider.userInfo.subscribe(
      res => {

        this.UserInfoReady = true;

        if (this.loader)
          this.loader.dismiss();

        if (res)
        {

          this.navCtrl.setRoot(HomePage);
        }
        else{
          this.UserNotConnected = true;
        }
        console.log(res);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (!this.UserInfoReady)
      this.presentLoading();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Chargement des données utilisateurs",
      duration: 3000
    });
    this.loader.present();
  }

}
