import {
  Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver,
  Injector, OnDestroy
} from '@angular/core';

import { SharedService } from '../shared.service';

declare const $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnDestroy {

  @ViewChild('modalBody', {read: ViewContainerRef}) modalBody;

  cmpRef: ComponentRef<any>;

  constructor(
    sharedService: SharedService,
    private componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    sharedService.showModal.subscribe(type => {
      if (this.cmpRef) {
        this.cmpRef.destroy();
      }
      this.modalBody.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(type);
      this.cmpRef = this.modalBody.createComponent(factory);

      $('#overlay').show();
    });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    this.cmpRef = null;
  }
}
