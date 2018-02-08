import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../fhict-api-service';
import {Schedule} from '../fhict-api-service/models';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public schedule: Schedule[];

  constructor(private service: ApiClientService, private app: AppComponent) {
  }

  ngOnInit() {
    if (!this.app.isLoggedIn) {
      return;
    }

    this.service.Schedule_MeByExpandteacherDaysStartStartlastmondayExpandweeksIncludedeleted(false, 5, '2018-02-05',
      true, false, false).subscribe(schedule => console.log(schedule));
  }

}
