import { Routes } from '@angular/router';
import { TableComponent } from './dashboard/table/table.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SummaryComponent } from './dashboard/summary/summary.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyReportComponent } from './property/property-report/property-report.component';

export const routes: Routes = [

    {
        path: '',
        component: DashboardComponent, // The layout component with <app-left-menu>
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
          { path: 'property-listing', component: TableComponent },
          { path: 'dashboard', component: SummaryComponent },
          { path: 'add-property', component: AddPropertyComponent  },
          { path: 'property-report', component: PropertyReportComponent },
        ],
      },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
];
