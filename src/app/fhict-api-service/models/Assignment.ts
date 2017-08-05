/* tslint:disable */
import { Submission } from "./Submission"
import { Lock_Info } from "./Lock_Info"
import { CanvasRubric } from "./CanvasRubric"
import { CanvasRubricSettings } from "./CanvasRubricSettings"

export class Assignment {
		id: number;
		description: string;
		due_at: string;
		unlock_at: string;
		lock_at: string;
		points_possible: number;
		grading_type: string;
		assignment_group_id: number;
		grading_standard_id: object;
		created_at: string;
		updated_at: string;
		peer_reviews: boolean;
		automatic_peer_reviews: boolean;
		position: number;
		grade_group_students_individually: boolean;
		anonymous_peer_reviews: boolean;
		group_category_id: number;
		post_to_sis: object;
		moderated_grading: boolean;
		course_id: number;
		name: string;
		submission_types: string[];
		has_submitted_submissions: boolean;
		muted: boolean;
		html_url: string;
		published: boolean;
		only_visible_to_overrides: boolean;
		locked_for_user: boolean;
		submissions_download_url: string;
		quiz_id: number;
		anonymous_submissions: boolean;
		lock_explanation: string;

		submission: Submission;
		lock_info: Lock_Info;
		rubric: CanvasRubric[];
		rubric_settings: CanvasRubricSettings;
}
