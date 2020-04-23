import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loader: any;
  public userInfoReady: boolean = false;
  public userNotConnected: boolean = false;


  constructor(public navCtrl: NavController, public userProvider: UserProvider, public loadingCtrl: LoadingController, public navParams: NavParams) {

    this.userProvider.userInfo.subscribe(
      res => {

        this.userInfoReady = true;

        if (this.loader) {
          this.loader.dismiss();
        }

        if (res) {
          this.navCtrl.setRoot(HomePage);
        } else {
          this.userNotConnected = true;
        }
        console.log("Résultat de la connexion : ", res);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (!this.userInfoReady) {
      this.presentLoading();
    }

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Chargement des données utilisateurs...",
      duration: 3000,
      spinner: 'crescent'
    });
    this.loader.present();
  }

}
