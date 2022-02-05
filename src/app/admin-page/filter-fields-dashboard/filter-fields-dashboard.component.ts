import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {FilterRequestService} from "../../shared/services/filterRequetsServise";
import {switchMap} from "rxjs/operators";
import {AdminMiddleware} from "../../shared/services/admin-middleware";
import {FilterRequestInitValue} from "../../shared/config/types";
import {ReqStringHostDirective} from "../../shared/directives/req-string-host.directive";
import {RequestSpringComponent} from "../../components/request-spring/request-spring.component";

@Component({
  selector: 'app-filter-fields-dashboard',
  templateUrl: './filter-fields-dashboard.component.html',
  styleUrls: ['./filter-fields-dashboard.component.css']
})

export class FilterFieldsDashboardComponent implements OnInit {

  field: string = '';
  emptyDBMessage = '';
  @Input() filterRequestInitValue: FilterRequestInitValue = {};
  @ViewChild(ReqStringHostDirective, {static: true}) appReqStringHost!: ReqStringHostDirective;

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
          if (typeof response !== 'string') {
            this.admin.setFields(response)
            this.filterRequestInitValue = this.admin.filterRequestInitValue
          } else {
            this.emptyDBMessage = response;
          }
          return this.frs.getRequest()
        }
      )
    )
      .subscribe(
        filterRequestInitValue => {
          this.admin.setFilterRequestInitValue(filterRequestInitValue);
          this.loadReqString();
        }
      );
  }

  editField(fieldName: string): void {
    this.admin.showEditor = !this.admin.showEditor;
    this.field = fieldName;
    this.changeDetect.detectChanges();
    this.admin.showEditor = true;
  }

  loadReqString(): void {
    const factory = this.resolver.resolveComponentFactory(RequestSpringComponent);
    const viewContainerRef = this.appReqStringHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<RequestSpringComponent>(factory);
    componentRef.instance.filterRequestInitValue = this.admin.filterRequestInitValue;
  }
}
