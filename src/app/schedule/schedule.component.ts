import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../fhict-api-service';
import {Schedule} from '../fhict-api-service/models';
import {AppComponent} from '../app.component';
import {ScheduleItem} from '../fhict-api-service/models/ScheduleItem';
import {Day} from '../models/Day';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  /**
   * @type {Array<Day>} Days and their Schedules
   */
  public days: Day[];

  /**
   * @type {number} of days displayed
   */
  protected daysCount = 5;

  /**
   * @type {number} There are 58 quarters from 08:45 to 23:15.
   */
  protected quartersPerDay = 58;

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
   * Create a schedule per day
   *
   * @param {Schedule} schedule
   * @returns {Day[]}
   */
  private schedulePerDay(schedule: Schedule): Day[] {

    const days = [];

    // Loop over the max amount of days defined
    for (let i = 0; i < this.daysCount; i++) {

      // Create new Day and add a new Schedule
      const daySchedule = new Day();
      daySchedule.date = new Date(schedule.start);
      daySchedule.date.setDate(daySchedule.date.getDate() + i);
      daySchedule.schedule = new Schedule();

      // Add the ScheduleItems with the corresponding date to this Day
      daySchedule.schedule.data = [];
      for (let d = 0; d < schedule.data.length; d++) {
        if (new Date(schedule.data[d].start).getDay() === daySchedule.date.getDay()) {
          daySchedule.schedule.data.push(schedule.data[d]);
        }
      }
      days.push(daySchedule);
    }

    return days;
  }

  /**
   * Schedule constructor
   *
   * @param {ApiClientService} service
   * @param {AppComponent} app
   */
  constructor(private service: ApiClientService, private app: AppComponent) {
    this.days = [];
  }

  /**
   * Initialize method
   */
  ngOnInit() {
    if (!this.app.isLoggedIn) {
      return;
    }

    this.service.Schedule_MeByExpandteacherDaysStartStartlastmondayExpandweeksIncludedeleted(false, this.daysCount, '2018-02-19',
      true, false, false).subscribe(schedule => {
      this.days = this.schedulePerDay(ScheduleComponent.combineBlocks(schedule));
    });
  }

  /**
   * Calculate the height of a single ScheduleItem
   *
   * @param {ScheduleItem} block
   * @returns {number}
   */
  singleHeight(block: ScheduleItem) {
    return (Math.ceil(Math.abs(new Date(block.start).getTime() - new Date(block.end).getTime()) / (1000 * 60 * 15)) /
      this.quartersPerDay) * 100;
  }

  /**
   * Calculate the offset of a single block
   *
   * @param {ScheduleItem} block
   * @returns {number}
   */
  blockOffset(block: ScheduleItem) {
    let dayStart = new Date(block.start);
    dayStart = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate(), 8, 45);
    return (Math.ceil(Math.abs(new Date(block.start).getTime() - dayStart.getTime()) / (1000 * 60 * 15)) /
      this.quartersPerDay) * 100;
  }
}
