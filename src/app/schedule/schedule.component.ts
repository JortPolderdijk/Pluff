import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../fhict-api-service';
import {Schedule} from '../fhict-api-service/models';
import {AppComponent} from '../app.component';
import {ScheduleItem} from '../fhict-api-service/models/ScheduleItem';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public schedule: Schedule;

  /**
   * Simple loop that returns the index of a value from a key in an array.
   *
   * @param {any[]} array
   * @param attr
   * @param value
   * @returns {number}
   */
  private static indexOfAttr(array: any[], attr: any, value: any) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Combine lessons into blocks and remove duplicates.
   *
   * @param {Schedule} schedule
   * @returns {Schedule}
   */
  private static combineBlocks(schedule: Schedule): Schedule {
    const items: ScheduleItem[] = [];

    // Convert teacherAbbreviation to array.
    for (let i = 0; i < schedule.data.length; i++) {
      schedule.data[i].teacherAbbreviation = [schedule.data[i].teacherAbbreviation];
    }

    // Loop through all blocks and combine them if start & time are the same, could be optimized.
    for (let i = 0; i < schedule.data.length; i++) {
      const item = schedule.data[i];

      /**
       * Get the attribute index
       * Combine blocks if an index was found.
       * Add as new block when index is -1
       */
      const attrIndex = ScheduleComponent.indexOfAttr(items, 'start', item.start);
      if (attrIndex > 0) {

        if (items[attrIndex].end === item.end) {
          items[attrIndex].teacherAbbreviation.push(item.teacherAbbreviation);
        }
      } else {

        items.push(item);
      }
    }

    schedule.data = items;

    return schedule;
  }

  /**
   * Schedule constructor
   *
   * @param {ApiClientService} service
   * @param {AppComponent} app
   */
  constructor(private service: ApiClientService, private app: AppComponent) {
    this.schedule = new Schedule();
  }

  /**
   * Initialize method
   */
  ngOnInit() {
    if (!this.app.isLoggedIn) {
      return;
    }

    this.service.Schedule_MeByExpandteacherDaysStartStartlastmondayExpandweeksIncludedeleted(false, 5, '2018-02-05',
      true, false, false).subscribe(schedule => {
      this.schedule = ScheduleComponent.combineBlocks(schedule);
    });
  }
}
