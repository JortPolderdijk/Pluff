import {Schedule} from '../fhict-api-service/models/Schedule';

export class Day {
  date: Date;
  schedule: Schedule;
  today: Boolean = false;
}
