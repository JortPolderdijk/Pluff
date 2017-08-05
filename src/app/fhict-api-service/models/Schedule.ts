/* tslint:disable */
import { ScheduleItem } from "./ScheduleItem"
import { Person } from "./Person"
import { Period } from "./Period"

export class Schedule {
		title: string;
		numberOfDays: number;
		start: string;
		includeDeleted: boolean;
		latestUpdate: string;

		data: ScheduleItem[];
		teachers: Person[];
		weeks: Period[];
}
