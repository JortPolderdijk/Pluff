/* tslint:disable */
import { CanvasRating } from "./CanvasRating"

export class CanvasRubric {
		id: string;
		points: number;
		description: string;
		long_description: string;
		outcome_id: number;
		vendor_guid: object;

		ratings: CanvasRating[];
}
