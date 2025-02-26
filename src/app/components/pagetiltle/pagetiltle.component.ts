import { Component, OnInit ,Input} from '@angular/core';
import { faLayerGroup,faEnvelope,faBell} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import {ApiService} from '../../services/api.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, NgIf } from '@angular/common';



@Component({
  selector: 'app-pagetiltle',
  templateUrl: './pagetiltle.component.html',
  styleUrls: ['./pagetiltle.component.css'],
  imports: [CarouselModule ,FontAwesomeModule,NgFor,NgIf,RouterLink],
  standalone:true,
})
export class PagetiltleComponent implements OnInit {

  @Input() breadcrumbItems: any;
  @Input() title: any ;
  @Input() preference: any;
  @Input() preferenceText: any;
  @Input() state: any;


  faLayerGroup=faLayerGroup;
  faEnvelope=faEnvelope;
  faBell=faBell;

  count:any;

  constructor(private apiservice: ApiService,private router:Router) { }


  ngOnInit() {
  }
  viewInbox(){
    this.router.navigate(['/inbox']);
  }
  viewNotifications(){
    this.router.navigate(['/notifications']);
  }
  getNotifications(){
    this.apiservice.getAllNotifications().subscribe((data)=>{

      this.count = data.length;
    })
  }


}
