import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
// import { Color, Label, SingleDataSet } from 'ng2-charts';
import { TaskService } from 'src/app/services/task.service';
import { ITypePercentage } from '../../interface/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  public doughnutChartLabels: string[] = [

  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
  };
  public typeData: Array<ITypePercentage> = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTypePercentage();
  }

  getTypePercentage() {
    let arr: any[] = [];
    let arr2:any[]= [];
    this.doughnutChartDatasets = [{ data: arr }];
    this.taskService.getTypePercentage().subscribe(
      (d) => {
        this.typeData = d;
        d.forEach((type: ITypePercentage) => {
          arr.push(type.count);
          arr2.push(type.type);
        });
        this.doughnutChartDatasets = [{ data: arr }]
        this.doughnutChartLabels= arr2;
        console.log(this.doughnutChartDatasets);
        console.log(this.doughnutChartLabels);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  refreshEmitter() {
    this.getTypePercentage();

  }
}