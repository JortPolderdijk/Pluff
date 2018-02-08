import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'scheduleparts'})
export class ScheduleItemParts implements PipeTransform {
  transform(value: any, end: any): number {
    return Math.ceil(Math.abs(new Date(value).getTime() - new Date(end).getTime()) / (1000 * 60));
  }

}
