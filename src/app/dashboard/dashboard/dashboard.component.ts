import { Component } from '@angular/core';
import { LeftMenuComponent } from "../left-menu/left-menu.component";
import { TableComponent } from "../table/table.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [LeftMenuComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
