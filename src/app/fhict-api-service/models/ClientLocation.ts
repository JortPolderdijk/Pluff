/* tslint:disable */
import { Mapinfo } from "./Mapinfo"
import { MapCoordinate } from "./MapCoordinate"
import { Statistics } from "./Statistics"
import { Geocoordinate } from "./Geocoordinate"

export class ClientLocation {
		macAddress: string;
		currentlyTracked: boolean;
		confidenceFactor: number;
		historyLogReason: object;
		networkStatus: string;
		changedOn: number;
		ipAddress: string[];
		userName: string;
		ssId: string;
		sourceTimestamp: object;
		band: string;
		apMacAddress: string;
		dot11Status: string;
		manufacturer: string;
		detectingControllers: string;
		bytesSent: number;
		bytesReceived: number;
		guestUser: boolean;

		mapInfo: Mapinfo;
		mapCoordinate: MapCoordinate;
		statistics: Statistics;
		geoCoordinate: Geocoordinate;
}
