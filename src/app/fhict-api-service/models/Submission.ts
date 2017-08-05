/* tslint:disable */
import { Attachment } from "./Attachment"

export class Submission {
		id: number;
		body: string;
		url: object;
		grade: string;
		score: number;
		submitted_at: string;
		assignment_id: number;
		user_id: number;
		submission_type: string;
		workflow_state: string;
		grade_matches_current_submission: boolean;
		graded_at: string;
		grader_id: number;
		attempt: number;
		excused: boolean;
		late: boolean;
		preview_url: string;

		attachments: Attachment[];
}
