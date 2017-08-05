/* tslint:disable */
import { NewsItem } from "./NewsItem"

export class NewsFeed {
		id: string;
		url: string;
		title: string;
		description: string;
		updated: string;

		items: NewsItem[];
}
