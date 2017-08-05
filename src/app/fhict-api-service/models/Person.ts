/* tslint:disable */
import { Group } from "./Group"

export class Person {
		id: string;
		url: string;
		givenName: string;
		surName: string;
		initials: string;
		displayName: string;
		mail: string;
		office: string;
		telephoneNumber: string;
		mobileNumber: string;
		photo: string;
		department: string;
		title: string;
		personalTitle: string;
		lat: number;
		long: number;
		affiliations: string[];
		updatedAt: string;
		uid: string;
		thumbnailData: string;
		employeeId: string;

		groups: Group[];
}
