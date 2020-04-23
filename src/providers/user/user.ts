import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserProvider {

  public userInfo:BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  public onCordova:boolean = false;

  private googleAuthId = "626532265516-cbvrtcao1kbm0qpk7k91ah7ve7mh0aqj.apps.googleusercontent.com";
  private firebaseDevicePlugin:any;

  constructor(public afAuth: AngularFireAuth,
              public platform: Platform) {

    this.platform.ready()
      .then(() => {

        if(this.platform.platforms().indexOf("cordova") >= 0)
          this.onCordova = true;

        if(this.onCordova)
        {
          this.listenToAuthChangeOnCordova();
          this.udpateUserInfoFromCordovaPlugin();
        }
        else
        {
          this.listenToAuthChangeOnDesktop();
        }

      });

    this.userInfo.subscribe(res => console.log("userInfoNew", res));
  }

  public listenToAuthChangeOnDesktop()
  {
    this.afAuth.authState.subscribe((res) => {
      this.userInfo.next(res);
    });
  }

  public listenToAuthChangeOnCordova()
  {
    this.firebaseDevicePlugin = (<any>window).FirebasePlugin;

    this.firebaseDevicePlugin.registerAuthStateChangeListener((userSignedIn) => {
      this.udpateUserInfoFromCordovaPlugin();
    });
  }

  public udpateUserInfoFromCordovaPlugin()
  {
    this.firebaseDevicePlugin.getCurrentUser(
      (user) => {
        user["displayName"] = user.name;
        this.userInfo.next(user);
      },
      (error) => {
        console.error("Failed to get current user data: " + error);
        this.userInfo.next(null);
      });
  }

  private loginFromCordovaPlugin()
  {
    this.firebaseDevicePlugin.authenticateUserWithGoogle(this.googleAuthId,
      (credential) => {

        this.firebaseDevicePlugin.signInWithCredential(credential,
          () => {
            console.log("Successfully signed in");
            this.udpateUserInfoFromCordovaPlugin();
          },
          (error) => {
            console.error("Failed to sign in", error);
            this.userInfo.next(null);
          });
      },
      (error) => {

        console.error("Failed to authenticate with Google: " + error);
        this.userInfo.next(null);

      });
  }

  public login()
  {
    this.platform.ready().then(() => {

      if(this.onCordova)
        this.loginFromCordovaPlugin();
      else
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

    });
  }

  public logout():Promise<any>
  {
    return new Promise((resolve, reject) => {
      if(this.onCordova)
      {
        this.firebaseDevicePlugin.signOutUser(
          () => resolve(true),
          (error) => reject("Failed to sign out user: " + error));
      }
      else
      {
        this.afAuth.auth.signOut()
          .then(() => resolve(true))
          .catch(() => (error) => reject("Failed to sign out user: " + error));
      }
    });
  }

}
