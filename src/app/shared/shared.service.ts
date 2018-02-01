import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  showModal: Subject<any> = new Subject();

  constructor() { }

}
