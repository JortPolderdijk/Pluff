/* tslint:disable */
import { GroupMember } from "./GroupMember"

export class Group {
		id: string;
		url: string;
		groupName: string;
		groupType: string;
		role: string;
		updatedAt: string;
		numberOfMembers: number;

		members: GroupMember[];
}
