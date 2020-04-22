import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage'
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { DailyFormPage } from '../pages/daily-form/daily-form';
import { RecordProvider } from '../providers/record/record';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserProvider } from '../providers/user/user';
import {LoginPage} from "../pages/login/login";

export const firebaseConfig = {
  apiKey: "AIzaSyC73UndUHsgg16impNMDTi9k8VohZQoObg",
  authDomain: "stoppc-cacae.firebaseapp.com",
  databaseURL: "https://stoppc-cacae.firebaseio.com",
  storageBucket: "stoppc-cacae.appspot.com",
  messagingSenderId: '<626532265516>'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TutorialPage,
    DailyFormPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TutorialPage,
    DailyFormPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecordProvider,
    AngularFireDatabase,
    UserProvider
  ]
})
export class AppModule {}
