import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'scheduleparts'})
export class ScheduleItemParts implements PipeTransform {
  /**
   * Transforms the start & end time to the height of a single timetable block
   * @param value
   * @param end
   * @returns {number}
   */
  transform(value: any, end: any): number {
    return Math.ceil(Math.abs(new Date(value).getTime() - new Date(end).getTime()) / (1000 * 60));
  }

}
