import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.css'],
  standalone:true,
  imports: [RouterOutlet]
})
export class AuthTemplateComponent implements OnInit {

  breadCrumbItems: Array<{}> = [];
  isReadMore: true = true;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Inbox', active: true }];

  }

}
