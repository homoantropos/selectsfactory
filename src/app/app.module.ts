import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ShowRoomComponent} from './show-room/show-room.component';
import {RequestSpringComponent} from './shared/components/request-spring/request-spring.component';
import {LoaderComponent} from './shared/ulils/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FilterFieldDbEditorComponent } from './admin-page/filter-field-db-editor/filter-field-db-editor.component';
import { FilterFieldsListComponent } from './admin-page/filter-fields-list/filter-fields-list.component';
import { FilterFieldsDashboardComponent } from './admin-page/filter-fields-dashboard/filter-fields-dashboard.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { ReqStringHostDirective } from './shared/directives/req-string-host.directive';
import { FieldNamesChoiceComponent } from './show-room/field-names-choice/field-names-choice.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    ShowRoomComponent,
    RequestSpringComponent,
    LoaderComponent,
    FilterFieldDbEditorComponent,
    FilterFieldsListComponent,
    FilterFieldsDashboardComponent,
    ReqStringHostDirective,
    FieldNamesChoiceComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule
    ],
  entryComponents: [
    RequestSpringComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
