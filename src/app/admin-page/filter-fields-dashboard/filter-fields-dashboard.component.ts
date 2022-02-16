import {ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {FilterRequestService} from "../../shared/services/filterRequetsServise";
import {switchMap} from "rxjs/operators";
import {AdminMiddleware} from "../../shared/services/admin-middleware";
import {FilterRequest, FilterRequestInitValue} from "../../shared/config/types";
import {ReqStringHostDirective} from "../../shared/directives/req-string-host.directive";
import {RequestSpringComponent} from "../../shared/components/request-spring/request-spring.component";

@Component({
  selector: 'app-filter-fields-dashboard',
  templateUrl: './filter-fields-dashboard.component.html',
  styleUrls: ['./filter-fields-dashboard.component.css']
})

export class FilterFieldsDashboardComponent implements OnInit {

  @Input() field: string = '';
  @Input() filterRequestInitValue: FilterRequestInitValue = {};
  @Input() showEditor: boolean = false;
  @ViewChild(ReqStringHostDirective, {static: true}) appReqStringHost!: ReqStringHostDirective;

  queryRequest: FilterRequest = {};

  constructor(
    private frs: FilterRequestService,
    private changeDetect: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    public admin: AdminMiddleware
  ) {
  }

  ngOnInit(): void {
    this.frs.getFilterFields().pipe(
      switchMap(
        response => {
          this.admin.setFields(response)
          this.filterRequestInitValue = this.admin.filterRequestInitValue
          return this.frs.getFullRequest()
        }
      )
    ).subscribe(
      response => {
        this.admin.setFilterRequestInitValue(response);
        this.loadReqString();
      }
    );
  }

  editField(fieldName: string): void {
    this.showEditor = !this.showEditor;
    this.field = fieldName;
    this.changeDetect.detectChanges();
    switch (fieldName) {
      case ('') :
        this.showEditor = true;
        break;
      case ('close editor') :
        this.showEditor = false;
        break;
      default: this.showEditor = true;
    }
  }

  closeEditor(closeEditor: boolean): void {
    this.showEditor = !closeEditor;
    this.queryRequest = {};
  }

  loadReqString(): void {
    const factory = this.resolver.resolveComponentFactory(RequestSpringComponent);
    const viewContainerRef = this.appReqStringHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<RequestSpringComponent>(factory);
    componentRef.instance.filterRequestInitValue = this.admin.filterRequestInitValue;
    componentRef.instance.filterRequest.subscribe(
      filterRequest => {
        this.queryRequest = filterRequest;
      })
      }

}
