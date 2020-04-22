import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DailyFormPage } from '../daily-form/daily-form';
import { RecordProvider, Record } from '../../providers/record/record';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;


  constructor(public navCtrl: NavController,
      public myRecordProvider : RecordProvider ) {

  }
  openDailyFrom()
  {
    this.navCtrl.push(DailyFormPage);
  }


  ionViewDidEnter() {
    this.createBarChart();
    this.myRecordProvider.$records.subscribe((records)=> this.updateChart(records));
    }

  updateChart(records:Array<Record>)
  {
    let values =[];
    let labels =[];
    let mood_values=[];

  for( let r of records)
  {
    values.push(r.nb_heuresPc);
    mood_values.push(r.mood/5);
    console.log("log : ", r);
    labels.push(r.date.getDate());
  }
  this.bars.data.labels = labels;
  this.bars.data.datasets[0].data = values;
  this.bars.data.datasets[1].data = mood_values;
  this.bars.update();
  }

  createBarChart() {

   


  this.bars = new Chart(this.barChart.nativeElement, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Heures de pc',
        data: [],
        backgroundColor: 'rgba(151, 249, 190, 0.5)', // array should have same number of elements as number of dataset
        borderColor: 'rgb(151, 249, 190)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
        label: 'Humeur du jour',
        data: [],
        backgroundColor: 'rgba(252, 147, 65, 0.5)', // array should have same number of elements as number of dataset
        borderColor: 'rgb(252, 147, 65)',// array should have same number of elements as number of dataset
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 20,
            stepSize: 10
          },
          gridLines :{
            display : false
          }
        }],
        Axes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines :{
            display : false
          }
        }]
      }
    }
  });
  }
}
  
