/* tslint:disable */
import { CanvasCalendar } from "./CanvasCalendar"
import { Enrollment } from "./Enrollment"

export class Course {
		id: number;
		is_public: boolean;
		name: string;
		start_at: string;
		end_at: string;
		public_syllabus: boolean;
		is_public_to_auth_users: boolean;
		link: string;

		calendar: CanvasCalendar;
		enrollments: Enrollment[];
}
