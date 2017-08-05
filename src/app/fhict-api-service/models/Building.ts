/* tslint:disable */
import { Beacon } from "./Beacon"

export class Building {
		id: string;
		url: string;
		abbr: string;
		name: string;
		description: string;
		address: string;
		postalCode: string;
		city: string;
		lat: number;
		long: number;
		lastModified: string;

		beacons: Beacon[];
}
