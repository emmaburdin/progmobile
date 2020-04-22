import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecordProvider } from '../../providers/record/record';


/**
 * Generated class for the DailyFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-daily-form',
  templateUrl: 'daily-form.html',
})
export class DailyFormPage {

  public myDate = new Date().toISOString();
  public nb_heuresPc = 10;
  public mood = 50;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public myrecordProvider: RecordProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyFormPage');
  }
  validateForm()
  {
    let myRecord ={
    "nb_heuresPc" : this.nb_heuresPc,
    "mood" : this.mood,
    "date" : new Date(this.myDate)
    }

    this.myrecordProvider.addRecord(myRecord);
  
    this.navCtrl.pop();
  }

}
