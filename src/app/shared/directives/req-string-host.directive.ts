import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appReqStringHost]'
})
export class ReqStringHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
