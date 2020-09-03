import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserProvider} from "../user/user";
import {identifierModuleUrl} from "@angular/compiler";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Subscription} from "rxjs";

/*
  Generated class for the RecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface Record {
  nb_heuresPc: number,
  mood: number,
  date: Date

}

@Injectable()
export class RecordProvider {

  public records: Array<Record> = [];
  public $records: BehaviorSubject<Array<Record>> = new BehaviorSubject<Array<Record>>([]);
  private userEmail: string = null;
  private remoteCollection:AngularFirestoreCollection<Record> =null;
  private remoteCollectionSubscription:Subscription=null;

  constructor(public storage: Storage,
              private firestore: AngularFirestore,
              private userProvider:UserProvider) {

    console.log('Hello RecordProvider Provider');

    /**/this.storage.get("records")
      .then((res) => {
        if (res != null) {

          this.records = JSON.parse(res);

          for (let r of this.records) {
            r.date = new Date(r.date);
          }
          this.$records.next(this.records);
        }
      });
    this.subscribeToUserEmail()/**/
  }

  subscribeToUserEmail()
  {
    this.userProvider.userInfo.subscribe(
      (res) =>{
        if (res && 'email' in res && res["email"])
        {
          this.userEmail = res.email;
          console.log("user email", this.userEmail)
          this.syncToRemoteCollection();
        }
        else {
          this.userEmail=null;
          this.unSyncFromRemoteCollection()
        }
      }
    )
  }
  unSyncFromRemoteCollection ()
  {
    if (this.remoteCollectionSubscription)
    {
      this.remoteCollectionSubscription.unsubscribe();
      this.remoteCollectionSubscription = null;
      this.remoteCollection = null;
    }
  }

  syncToRemoteCollection()
  {
    if(this.userEmail)
    {
      this.remoteCollection =this.firestore.doc<any>("users/" +this.userEmail).collection<Record>("records");
      this.remoteCollectionSubscription = this.remoteCollection.valueChanges()
        .subscribe(
          (newValue) => {
            this.records = newValue;
            this.$records.next(this.records);

          }
        )
    }
  }

  addRecord(newRecord: any) {
    this.remoteCollection.doc(this.getRecordId(newRecord)).set(newRecord);
  }
  getRecordId (record:Record):string
  {
    if(record)
      return record.date.getTime().toString()
    else
      return null;
  }

}
