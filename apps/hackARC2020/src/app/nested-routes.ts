import { Routes } from '@angular/router';

import { GlobalNavDemoComponent } from './components/global-nav-demo/global-nav-demo.component';

import { ClientComponent } from './components/client/client.component';
import { RateComponent } from './components/rate/rate.component';
import { OriginationComponent } from './components/origination/origination.component';


export const nestedRoutes: { title: string; routes: Routes }[] = [

  {
    title: 'ARRO',
    routes: [
      //{ path: 'account', loadChildren: AccountModule },
      { path: 'origination', component: OriginationComponent, data: { title: 'ARR Origination' }  },
      { path: 'client', component: ClientComponent, data: { title: 'ARR Conversion' } },
      { path: 'rate', component: RateComponent, data: { title: 'Rates Comparison' } }
    ]
  }
].map((groups) => {
  groups.routes = groups.routes.sort((a: any, b: any) => a.data.title.localeCompare(b.data.title));
  return groups;
});
