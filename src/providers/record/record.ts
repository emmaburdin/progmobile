import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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


  constructor(public storage: Storage) {

    console.log('Hello RecordProvider Provider');

    this.storage.get("records")
      .then((res) => {
        if (res != null) {

          this.records = JSON.parse(res);
          this.$records.next(this.records);

          for (let r of this.records) {
            r.date = new Date(r.date);
          }

        }
      })
  }

  addRecord(newRecords: any) {
    this.records.push(newRecords);
    this.$records.next(this.records);
    //console.log("new record added", this.records);
    this.storage.set("records", JSON.stringify(this.records));
  }
}
