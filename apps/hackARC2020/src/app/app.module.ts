import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RepeaterCardExampleComponent } from './components/repeater-demo/repeater-card-example/repeater-card-example.component';
import { RepeaterCardAdvancedExampleComponent } from './components/repeater-demo/repeater-card-advanced-example/repeater-card-advanced-example.component';
import { RepeaterCardChartExampleComponent } from './components/repeater-demo/repeater-card-chart-example/repeater-card-chart-example.component';
import { AvatarDemoComponent } from './components/avatar-demo/avatar-demo.component';
import { ChartDemoComponent } from './components/chart-demo/chart-demo.component';
import { ExpandableTableDemoComponent } from './components/expandable-table-demo/expandable-table-demo.component';
import { FilterPanelDemoComponent } from './components/filter-panel-demo/filter-panel-demo.component';
import { FoundationsDemoComponent } from './components/foundations-demo/foundations-demo.component';
import { HomeComponent } from './components/home/home.component';
import { PopoverDemoComponent } from './components/popover-demo/popover-demo.component';
import { RepeaterDemoComponent } from './components/repeater-demo/repeater-demo.component';
import { FieldMatcherComponent } from './components/repeater-demo/field-matcher/field-matcher.component';
import { SkeletonDemoComponent } from './components/skeleton-demo/skeleton-demo.component';
import { ThemeBuilderComponent } from './components/theme-builder/theme-builder-demo.component';
import { UiElementsDemoComponent } from './components/ui-elements-demo/ui-elements-demo.component';
import { UserProfileMenuDemoComponentComponent } from './components/user-profile-menu-demo/user-profile-menu-demo-component.component';
import { VectorMapDemoComponent } from './components/vector-map-demo/vector-map-demo.component';
import { WizardDemoComponent } from './components/wizard-demo/wizard-demo.component';
import { BannerDemoComponent } from './components/banner-demo/banner-demo.component';
import { EntityMenuDemoComponent } from './components/entity-menu-demo/entity-menu-demo.component';
import { ChangelogDemoComponent } from './components/changelog-demo/changelog-demo.component';
import { SearchInputDemoComponent } from './components/search-input-demo/search-input-demo.component';
import { BreadcrumbDemoComponent } from './components/breadcrumb-demo/breadcrumb-demo.component';
import { ToasterDemoComponent } from './components/toaster-demo/toaster-demo.component';

import { GlobalSearchModule } from '@ffdc/uxg-angular-components/global-search';
import { RepeaterModule } from '@ffdc/uxg-angular-components/repeater';
import { ScrollToTopModule } from '@ffdc/uxg-angular-components/scroll-to-top';
import { UxgTableModule } from '@ffdc/uxg-angular-components/table';
import { PopoverModule } from '@ffdc/uxg-angular-components/popover';
import { FilterTreeModule } from '@ffdc/uxg-angular-components/filter/filter-tree';
import { FilterTagsModule } from '@ffdc/uxg-angular-components/filter/filter-tags';
import { WizardModule } from '@ffdc/uxg-angular-components/wizard';
import { FilterGroupModule } from '@ffdc/uxg-angular-components/filter/filter-group';
import { FilterToggleModule } from '@ffdc/uxg-angular-components/filter/filter-toggle';
import { MultiselectTagsModule } from '@ffdc/uxg-angular-components/filter/multiselect-tags';
import { VectorMapModule } from '@ffdc/uxg-angular-components/vector-map';
import { ChartModule } from '@ffdc/uxg-angular-components/chart';
import { AvatarModule } from '@ffdc/uxg-angular-components/avatar';
import { ExpandableTableModule } from '@ffdc/uxg-angular-components/expandable-table';
import { PaletteModule } from '@ffdc/uxg-angular-components/core';
import { SkeletonTextModule } from '@ffdc/uxg-angular-components/skeleton-text';
import { UxgUserProfileMenuModule } from '@ffdc/uxg-angular-components/user-profile-menu';
import { BannerModule } from '@ffdc/uxg-angular-components/banner';
import { GlobalNavModule } from '@ffdc/uxg-angular-components/global-nav';
import { GlobalNavDemoComponent } from './components/global-nav-demo/global-nav-demo.component';
import { AccountCardDemoComponent } from './components/account-card-demo/account-card-demo.component';
import { AccountCardModule } from '@ffdc/uxg-angular-components/cards/account-card';
import { EntityMenuModule } from '@ffdc/uxg-angular-components/entity-menu';
import { ColorSketchModule } from 'ngx-color/sketch';

import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator';

import { HttpClientModule } from '@angular/common/http';

import { UxgSearchInputModule } from '@ffdc/uxg-angular-components/search-input';
import { UXGChangelogModule } from '@ffdc/uxg-angular-components/changelog';
import { UxgBreadcrumbModule } from '@ffdc/uxg-angular-components/breadcrumb';
import { ToasterModule } from '@ffdc/uxg-angular-components/toaster';
import { VideoThumbnailModule } from '@ffdc/uxg-angular-components/video-thumbnail';
import {
  VideoThumbnailDemoComponent,
  VideoDialogComponent
} from './components/video-thumbnail/video-thumbnail.component';
import { NewclientComponent } from './components/newclient/newclient.component';
import { ClientComponent } from './components/client/client.component';
import { RateComponent } from './components/rate/rate.component';
import { MatSortModule } from '@angular/material/sort';
import { CalcdealComponent } from './components/client/calcdeal/calcdeal.component';
import { OriginationComponent } from './components/origination/origination.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { ClientCardComponent } from './components/client-card/client-card.component';
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AvatarDemoComponent,
    ChartDemoComponent,
    ExpandableTableDemoComponent,
    FilterPanelDemoComponent,
    FoundationsDemoComponent,
    HomeComponent,
    PopoverDemoComponent,
    RepeaterDemoComponent,
    FieldMatcherComponent,
    RepeaterCardAdvancedExampleComponent,
    RepeaterCardChartExampleComponent,
    RepeaterCardExampleComponent,
    SkeletonDemoComponent,
    ThemeBuilderComponent,
    UiElementsDemoComponent,
    UserProfileMenuDemoComponentComponent,
    VectorMapDemoComponent,
    WizardDemoComponent,
    AppComponent,
    BannerDemoComponent,
    GlobalNavDemoComponent,
    AccountCardDemoComponent,
    EntityMenuDemoComponent,
    SearchInputDemoComponent,
    ChangelogDemoComponent,
    BreadcrumbDemoComponent,
    ToasterDemoComponent,
    VideoThumbnailDemoComponent,
    VideoDialogComponent,
    NewclientComponent,
    ClientComponent,
    RateComponent,
    CalcdealComponent,
    OriginationComponent,
    ClientCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ScrollToTopModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalSearchModule,
    RepeaterModule,
    FlexLayoutModule,
    GlobalSearchModule,
    PaletteModule,
    ScrollToTopModule,
    PopoverModule,
    UxgTableModule,
    FilterTagsModule,
    FilterTreeModule,
    VectorMapModule,
    ChartModule,
    WizardModule,
    FilterGroupModule,
    FilterToggleModule,
    SkeletonTextModule,
    ExpandableTableModule,
    MultiselectTagsModule,
    AvatarModule,
    UxgUserProfileMenuModule,
    BannerModule,
    GlobalNavModule,
    EntityMenuModule,
    ColorSketchModule,
    AccountCardModule,
    EntityMenuModule,
    UxgSearchInputModule,
    UXGChangelogModule,
    UxgBreadcrumbModule,
    ToasterModule,
    VideoThumbnailModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    NgxSliderModule,
    PlotlyModule
  ],
  providers: [DatePipe],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
