/* tslint:disable */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Building, Beacon, Calendar, CalendarItem, Course, CanvasCalendar, Enrollment, CanvasToDo, Assignment, Submission, Lock_Info, CanvasRubric, CanvasRubricSettings, Attachment, CanvasRating, CanvasUpcoming, StudyResult, Group, GroupMember, InzetItem, ClientLocation, Mapinfo, MapCoordinate, Statistics, Geocoordinate, Floordimension, Image, MaxDetectedRssi, WifiUser, FloorStatistic, NewsFeed, NewsItem, Person, Claim, RoomOccupancy, Schedule, ScheduleItem, Period, ScheduleQueryItem, UserSetting, SpPerson } from './models';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
/**
 * Created with angular2-swagger-client-generator v
 */
export class ApiClientService {
	domain:string;

  constructor(public http: Http){
    this.domain = 'https://api.fhict.nl';
  }
  /*
	constructor(public http: Http, options?: any) {
		var domain = (typeof options === 'object') ? options.domain : options;
		this.domain = typeof(domain) === 'string' ? domain : 'https://api.fhict.nl';

		if(this.domain.length === 0) {
			throw new Error('Domain parameter must be specified as a string.');
		}

			this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
	}
  */

  /**
  *
	* @method
	* @name returnBody
	*
	*/
  private returnBody(res: Response){
    return res.json();
  }

  private returnResponse(res: Response){
    return res;
  }

  /**
  *
	* @method
	* @name getDefaultHeaders
	*
	*/
  private getDefaultHeaders(): Headers {
    let headers = new Headers();

    // Use this methode to insert some headers that are send with each request.
    // Usefull for setting the `Autorization header` or any other header you want send with each request.
    if(this.hasAuthorizationHeader()) {
      headers.set('Authorization',this.authorizationHeaderValue);
    }

    headers.set('Content-Type','application/json');
    return headers;
  }

  /**
	 * Is the Authorization header set?
	 *
	 * @method
	 * @name hasAuthorizationHeader
	 */
   public hasAuthorizationHeader(): boolean {
 		return (typeof this.authorizationHeaderValue!='undefined' && this.authorizationHeaderValue.length > 0) ? true : false;
 	}

  private authorizationHeaderValue:string;

  /**
  * Set the oauth2 access token
  * @method
  * @name setTokenoauth2
  *
  */
  public setTokenoauth2(token:string){
    this.authorizationHeaderValue = 'Bearer '+token;
  }


	/**
  * List all our buildings
  *
	* @method
	* @name Buildings_Get
	*/
	public Buildings_Get(): Observable<Building[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/buildings`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get a specific building
  *
	* @method
	* @name Buildings_GetById
	* @param {string} id - The ID of the building
	*/
	public Buildings_GetById(id: string): Observable<Building> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/buildings/${id}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * List buildings nearby specific location. Lat/long +/- 0.2
  *
	* @method
	* @name Buildings_NearbyByLatitudeLongitude
	* @param {number} latitude - Latitude to search for
	* @param {number} longitude - Longitude to search for
	*/
	public Buildings_NearbyByLatitudeLongitude(latitude: number, longitude: number): Observable<Building[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(latitude !== undefined){
			params.set('latitude',latitude.toString());
		}


		if(longitude !== undefined){
			params.set('longitude',longitude.toString());
		}

		let uri = `/buildings/nearby`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request a calendar for a specific group of students/staff members.
  *
	* @method
	* @name Calendar_SharedByKindTagStart
	* @param {string} kind - Group kind (students/staff)
	* @param {string} tag - Calendar Tag, possible values can be requested with tags/{kind}
	* @param {string} start - From which date should the calendar be fetched.
	*/
	public Calendar_SharedByKindTagStart(kind: string, tag: string, start: string): Observable<Calendar> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();




		if(start !== undefined){
			params.set('start',start.toString());
		}

		let uri = `/calendar/${kind}/${tag}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request possible calendar tags for a certain group.
  *
	* @method
	* @name Calendar_TagsByKind
	* @param {string} kind - Group kind (students/staff)
	*/
	public Calendar_TagsByKind(kind: string) {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/calendar/tags/${kind}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnResponse);
	}

	/**
  * Fetch all your current canvas courses.
  *
	* @method
	* @name Canvas_PersonalCourses
	*/
	public Canvas_PersonalCourses(): Observable<Course[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/canvas/courses/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Fetch your current ToDo items from Canvas.
  *
	* @method
	* @name Canvas_PersonalToDo
	*/
	public Canvas_PersonalToDo(): Observable<CanvasToDo[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/canvas/todo/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Fetch your upcoming assignments from Canvas.
  *
	* @method
	* @name Canvas_PersonalUpcoming
	*/
	public Canvas_PersonalUpcoming(): Observable<CanvasUpcoming[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/canvas/upcoming/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Fetch the assignments for a course, you wont get a response if you dont have access
  *
	* @method
	* @name Canvas_GetCourseAssignmentsByCourseidBucket
	* @param {integer} courseId - 
	* @param {string} bucket - 
	*/
	public Canvas_GetCourseAssignmentsByCourseidBucket(courseId: number, bucket: string): Observable<Assignment[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();



		if(bucket !== undefined){
			params.set('bucket',bucket.toString());
		}

		let uri = `/canvas/course/${courseId}/assignments`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request personal study results. Always display the 'rights' message in your application.
  *
	* @method
	* @name Grades_Me
	*/
	public Grades_Me(): Observable<StudyResult[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/grades/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * The text that should be displayed in your app if you show student grades.
  *
	* @method
	* @name Grades_Rights
	*/
	public Grades_Rights(): Observable<string> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/grades/rights`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Staff members may request results for students. Always display the 'rights' message in your application.
  *
	* @method
	* @name Grades_StudentByUsername
	* @param {string} username - The username of the student (eg. i123456)
	*/
	public Grades_StudentByUsername(username: string): Observable<StudyResult[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/grades/${username}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * All the groups your allowed to see.
  *
	* @method
	* @name Groups_List
	*/
	public Groups_List(): Observable<Group[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/groups`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Details about a specific group.
  *
	* @method
	* @name Groups_GetByIdIncludemembers
	* @param {string} id - ID of the group
	* @param {boolean} includeMembers - Whether or not the members should be included.
	*/
	public Groups_GetByIdIncludemembers(id: string, includeMembers: boolean): Observable<Group> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();



		if(includeMembers !== undefined){
			params.set('includeMembers',includeMembers.toString());
		}

		let uri = `/groups/${id}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * 
  *
	* @method
	* @name Inzet_Me
	*/
	public Inzet_Me(): Observable<InzetItem[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/inzet/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * 
  *
	* @method
	* @name Inzet_DocentByUsername
	* @param {string} username - Please use this to try out our api, and if you want to use it in an app or website, you can request your client credentials here (https://api.fhict.nl/Documentation/RequestAccess)
	*/
	public Inzet_DocentByUsername(username: string): Observable<InzetItem[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/inzet/${username}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request the current user's location (you'll need fhict_location)
  *
	* @method
	* @name Location_Current
	*/
	public Location_Current(): Observable<ClientLocation[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/location/current`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request the location of a user, doesn't seem to work right now.
  *
	* @method
	* @name Location_HistoryByDate
	* @param {string} date - The date to return the history for.
	*/
	public Location_HistoryByDate(date: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(date !== undefined){
			params.set('date',date.toString());
		}

		let uri = `/location/history`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Count all clients
  *
	* @method
	* @name Location_CountClientsByFloorrefid
	* @param {string} floorRefId - The floorref ID to filter
	*/
	public Location_CountClientsByFloorrefid(floorRefId: string): Observable<number> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(floorRefId !== undefined){
			params.set('floorRefId',floorRefId.toString());
		}

		let uri = `/location/cmx_count_clients`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get all devices in R1 (anonymised)
  *
	* @method
	* @name Location_Devices
	*/
	public Location_Devices(): Observable<WifiUser[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/location/devices`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Active wifi devices per floor according the CMX.
  *
	* @method
	* @name Location_GetFloorStatistics
	*/
	public Location_GetFloorStatistics(): Observable<FloorStatistic[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/location/floor-statistics`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Image of specific floor
  *
	* @method
	* @name Location_MapImageByCampusBuildingFloor
	* @param {string} campus - Name of the campus
	* @param {string} building - Name of the building
	* @param {string} floor - Name of the floor
	*/
	public Location_MapImageByCampusBuildingFloor(campus: string, building: string, floor: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();




		let uri = `/location/mapimage/${campus}/${building}/${floor}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Image of a specific floor
  *
	* @method
	* @name Location_MapImageJpgBySource
	* @param {string} source - Source as returned from current location
	*/
	public Location_MapImageJpgBySource(source: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/location/mapimage/${source}.jpg`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Image of a specific floor
  *
	* @method
	* @name Location_MapImagePngBySource
	* @param {string} source - Source as returned from current location
	*/
	public Location_MapImagePngBySource(source: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/location/mapimage/${source}.png`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get all clients (NDA restricted)
  *
	* @method
	* @name Location_AllClientsByFloorrefid
	* @param {string} floorRefId - The floorref ID to filter
	*/
	public Location_AllClientsByFloorrefid(floorRefId: string) {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(floorRefId !== undefined){
			params.set('floorRefId',floorRefId.toString());
		}

		let uri = `/location/cmx_all_clients`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnResponse);
	}

	/**
  * Get all users in a certain zone (admin only)
  *
	* @method
	* @name Location_ZoneByZone
	* @param {string} zone - A zone defined by FHICT
	*/
	public Location_ZoneByZone(zone: string) {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/location/zone/${zone}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnResponse);
	}

	/**
  * List all available newsfeeds
  *
	* @method
	* @name News_ListFeeds
	*/
	public News_ListFeeds(): Observable<NewsFeed[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/newsfeeds`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request one newsfeed
  *
	* @method
	* @name News_FeedByTypeItems
	* @param {string} type - The type requested from the list query.
	* @param {integer} items - Number off items to include in the response (15 = default).
	*/
	public News_FeedByTypeItems(type: string, items: number): Observable<NewsFeed> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();



		if(items !== undefined){
			params.set('items',items.toString());
		}

		let uri = `/newsfeeds/${type}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request posts of one newsfeed
  *
	* @method
	* @name News_PostsByType
	* @param {string} type - The type requested from the list query.
	*/
	public News_PostsByType(type: string): Observable<NewsItem[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/newsfeeds/${type}/posts`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * List all teachers and staff.
  *
	* @method
	* @name People_List
	*/
	public People_List(): Observable<Person[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/people`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Information about the user who authorized the request.
  *
	* @method
	* @name People_Me
	*/
	public People_Me(): Observable<Person> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/people/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Search for staff members
  *
	* @method
	* @name People_SearchByQuery
	* @param {string} query - Part of name/office, start of PersonalTitle/Id/Department
	*/
	public People_SearchByQuery(query: string): Observable<Person[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/people/search/${query}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Information about a specific user
  *
	* @method
	* @name People_ByIdById
	* @param {string} id - Username of the user
	*/
	public People_ByIdById(id: string): Observable<Person> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/people/${id}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * View the scopes of the current token.
  *
	* @method
	* @name Permissions_Scopes
	*/
	public Permissions_Scopes() {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/permissions/scopes`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnResponse);
	}

	/**
  * View the roles of the current token
  *
	* @method
	* @name Permissions_Roles
	*/
	public Permissions_Roles() {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/permissions/roles`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnResponse);
	}

	/**
  * View all the claims of the current token.
  *
	* @method
	* @name Permissions_Claims
	*/
	public Permissions_Claims(): Observable<Claim[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/permissions/claims`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get a picture access token.
  *
	* @method
	* @name Permissions_GetPictureToken
	*/
	public Permissions_GetPictureToken(): Observable<string> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/permissions/picture_token`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.post(this.domain + uri, null, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request the public image of a user
  *
	* @method
	* @name Picture_PublicImageByUsername
	* @param {string} username - Username of the user you want to get the image for
	*/
	public Picture_PublicImageByUsername(username: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/pictures/${username}.jpg`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request the official image of a student (for staff only)
  *
	* @method
	* @name Picture_RestrictedImageByUsername
	* @param {string} username - Username of the student you want to get the image for
	*/
	public Picture_RestrictedImageByUsername(username: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/pictures/restricted/${username}.jpg`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Generate a qr-code based on input data.
  *
	* @method
	* @name Qr_GenerateByDataSize
	* @param {string} data - The data to create a QR code for
	* @param {integer} size - The size in pixels. [400]
	*/
	public Qr_GenerateByDataSize(data: string, size: number): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(data !== undefined){
			params.set('data',data.toString());
		}


		if(size !== undefined){
			params.set('size',size.toString());
		}

		let uri = `/qr/generate`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * List all the rooms, and it they are occupied.
  *
	* @method
	* @name Rooms_OccupancyByDate
	* @param {string} date - Specify the date you want to compute the occupance for. (2015-07-28) [default = today]
	*/
	public Rooms_OccupancyByDate(date: string): Observable<RoomOccupancy[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/rooms/occupancy/${date}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get your personal schedule.
  *
	* @method
	* @name Schedule_MeByExpandteacherDaysStartStartlastmondayExpandweeksIncludedeleted
	* @param {boolean} expandTeacher - Expand the teacher information (default = false)
	* @param {integer} days - Number of days to retrieve (default = 31), 'until = start.AddDays(days)';
	* @param {string} start - First day to request format yyyy-mm-dd (defaults = today)
	* @param {boolean} startLastMonday - Request the schedule starting last monday. This overrides the start parameter (default = false)
	* @param {boolean} expandWeeks - Include the schoolweeks in the output (default = false)
	* @param {boolean} includeDeleted - Include the deleted items in the results (default = false)
	*/
	public Schedule_MeByExpandteacherDaysStartStartlastmondayExpandweeksIncludedeleted(expandTeacher: boolean, days: number, start: string, startLastMonday: boolean, expandWeeks: boolean, includeDeleted: boolean): Observable<Schedule> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(expandTeacher !== undefined){
			params.set('expandTeacher',expandTeacher.toString());
		}


		if(days !== undefined){
			params.set('days',days.toString());
		}


		if(start !== undefined){
			params.set('start',start.toString());
		}


		if(startLastMonday !== undefined){
			params.set('startLastMonday',startLastMonday.toString());
		}


		if(expandWeeks !== undefined){
			params.set('expandWeeks',expandWeeks.toString());
		}


		if(includeDeleted !== undefined){
			params.set('includeDeleted',includeDeleted.toString());
		}

		let uri = `/schedule/me`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get all possible values to query the schedule
  *
	* @method
	* @name Schedule_AutoCompleteByKindFilter
	* @param {string} kind - What kind of autocomplete are you requesting [Any,Class,Room,Subject,Teacher]
	* @param {string} filter - Filter the possible values [name.ToLower().Contains(filter)]
	*/
	public Schedule_AutoCompleteByKindFilter(kind: string, filter: string): Observable<ScheduleQueryItem[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();



		if(filter !== undefined){
			params.set('filter',filter.toString());
		}

		let uri = `/schedule/autocomplete/${kind}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Query the schedule for a specific class/room/subject/teacher
  *
	* @method
	* @name Schedule_ForQueryByKindQueryDaysExpandteacherStartStartlastmondayExpandweeksIncludedeleted
	* @param {string} kind - What kind of schedule are you requesting [Any,Class,Room,Subject,Teacher,User]
	* @param {string} query - The class/room/subject/teacher abbreviation/user
	* @param {integer} days - Number of days to retrieve (default = 31), 'until = start.AddDays(days)';
	* @param {boolean} expandTeacher - Expand the teacher information (default = false)
	* @param {string} start - First day to request format yyyy-mm-dd (default = today)
	* @param {boolean} startLastMonday - Request the schedule starting last monday (default = false)
	* @param {boolean} expandWeeks - Include the schoolweeks in the output (default = false)
	* @param {boolean} includeDeleted - Include the deleted items in the results (default = false)
	*/
	public Schedule_ForQueryByKindQueryDaysExpandteacherStartStartlastmondayExpandweeksIncludedeleted(kind: string, query: string, days: number, expandTeacher: boolean, start: string, startLastMonday: boolean, expandWeeks: boolean, includeDeleted: boolean): Observable<Schedule> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();




		if(days !== undefined){
			params.set('days',days.toString());
		}


		if(expandTeacher !== undefined){
			params.set('expandTeacher',expandTeacher.toString());
		}


		if(start !== undefined){
			params.set('start',start.toString());
		}


		if(startLastMonday !== undefined){
			params.set('startLastMonday',startLastMonday.toString());
		}


		if(expandWeeks !== undefined){
			params.set('expandWeeks',expandWeeks.toString());
		}


		if(includeDeleted !== undefined){
			params.set('includeDeleted',includeDeleted.toString());
		}

		let uri = `/schedule/${kind}/${query}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request school week numbers
  *
	* @method
	* @name Schedule_Weeks
	*/
	public Schedule_Weeks(): Observable<Period[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/schedule/weeks`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Request school holidays
  *
	* @method
	* @name Schedule_Holidays
	*/
	public Schedule_Holidays(): Observable<Period[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/schedule/holidays`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * View all user defined settings
  *
	* @method
	* @name Settings_List
	*/
	public Settings_List(): Observable<UserSetting[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();

		let uri = `/settings`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Add a new user setting
  *
	* @method
	* @name Settings_PutByModel
	* @param {UserSetting} model - Please use this to try out our api, and if you want to use it in an app or website, you can request your client credentials here (https://api.fhict.nl/Documentation/RequestAccess)
	*/
	public Settings_PutByModel(model: UserSetting) {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		payload['model'] = model;
		let uri = `/settings`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.put(this.domain + uri, JSON.stringify(model), requestOptions)
			.map(this.returnResponse);
	}

	/**
  * Delete a user setting
  *
	* @method
	* @name Settings_DeleteByKey
	* @param {string} key - The key of the setting. Must start with the client-id
	*/
	public Settings_DeleteByKey(key: string): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(key !== undefined){
			params.set('key',key.toString());
		}

		let uri = `/settings`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.delete(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Update one setting for the user.
  *
	* @method
	* @name Settings_PatchByModel
	* @param {UserSetting} model - Please use this to try out our api, and if you want to use it in an app or website, you can request your client credentials here (https://api.fhict.nl/Documentation/RequestAccess)
	*/
	public Settings_PatchByModel(model: UserSetting): Observable<object> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		payload['model'] = model;
		let uri = `/settings`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.patch(this.domain + uri, JSON.stringify(model), requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get a single user setting.
  *
	* @method
	* @name Settings_GetByKey
	* @param {string} key - The key of the setting. Must start with the client-id
	*/
	public Settings_GetByKey(key: string): Observable<UserSetting> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/settings/${key}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get a single user setting as string.
  *
	* @method
	* @name Settings_GetStringByKey
	* @param {string} key - The key of the setting. Must start with the client-id
	*/
	public Settings_GetStringByKey(key: string): Observable<string> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/settings/${key}/string`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get a single user setting as boolean.
  *
	* @method
	* @name Settings_GetBoolByKey
	* @param {string} key - The key of the setting. Must start with the client-id
	*/
	public Settings_GetBoolByKey(key: string): Observable<boolean> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		let uri = `/settings/${key}/bool`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get all Sharepoint Keywords (or a filtered list of keywords). Can be used to search for people
  *
	* @method
	* @name Sharepoint_GetAllKeywordsByFilter
	* @param {string} filter - keywords.Where(k=&gt;k.Contains(filter));
	*/
	public Sharepoint_GetAllKeywordsByFilter(filter: string) {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(filter !== undefined){
			params.set('filter',filter.toString());
		}

		let uri = `/sharepoint/keywords`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnResponse);
	}

	/**
  * Query people on UserProfile properties
  *
	* @method
	* @name Sharepoint_PeopleQueryByQueryIncludestudents
	* @param {string} query - Some keyword (or advanced query)
	* @param {boolean} includeStudents - Specify includeStudents=true if you also want students
	*/
	public Sharepoint_PeopleQueryByQueryIncludestudents(query: string, includeStudents: boolean): Observable<SpPerson[]> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();


		if(query !== undefined){
			params.set('query',query.toString());
		}


		if(includeStudents !== undefined){
			params.set('includeStudents',includeStudents.toString());
		}

		let uri = `/sharepoint/people`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}

	/**
  * Get SharePoint profile for one user
  *
	* @method
	* @name Sharepoint_ProfileByUsernameAllowhtml
	* @param {string} username - Username for which you want to see the profile.
	* @param {boolean} allowHtml - Some fields could contain HTML, but are converted to text by default. Supply ?allowHtml=true to disable this conversion.
	*/
	public Sharepoint_ProfileByUsernameAllowhtml(username: string, allowHtml: boolean): Observable<SpPerson> {
		let payload = {};
		let params = new URLSearchParams();
		let headers = this.getDefaultHeaders();



		if(allowHtml !== undefined){
			params.set('allowHtml',allowHtml.toString());
		}

		let uri = `/sharepoint/profile/${username}`;
    let requestOptions = new RequestOptions({headers: headers,search:params});
		return this.http
			.get(this.domain + uri, requestOptions)
			.map(this.returnBody);
	}


}
