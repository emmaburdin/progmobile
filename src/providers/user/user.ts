import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from "rxjs";
import firebase from "firebase/app";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public userInfo:Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
    this.userInfo=this.afAuth.authState;

  }

  public login ()
  {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

}
