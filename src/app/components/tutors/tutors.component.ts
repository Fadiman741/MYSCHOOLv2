import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {faChalkboardUser,faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { FooterComponent } from "../footer/footer.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelineComponent } from "../timeline/timeline.component";
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
  imports: [PagetiltleComponent, CarouselModule, FontAwesomeModule, TimelineComponent,NgFor,MatIconModule],
  standalone:true,
})
export class TutorsComponent implements OnInit {

  breadCrumbItems: Array<{}> = [];

  faChalkboardUser=faChalkboardUser;
  faBookOpenReader = faBookOpenReader;
  tutors: any;
  tutorlist: any;
    institutions:any;
  members:any;
  students: any;


  constructor(private apiservice: ApiService, private router:Router) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Tutoring', active: true }];
    this.getTutors();

  }
  openTutors(){
    this.router.navigate(['/tutors']);
  }
    getTutors = () => {
    this.apiservice.getAllUsers().subscribe(
      (data) => {
        this.institutions = data.filter((user: { occupation: string; }) => user.occupation === 'Institution');
        console.log(this.institutions);
        this.tutors = data.filter((user: { occupation: string; }) => user.occupation === 'Tutor');
        this.tutorlist = this.tutors.slice(0, 4);
        console.log(this.tutorlist);
        console.log(this.tutors);
        this.students = data.filter((user: { occupation: string; }) => user.occupation === 'Student'); 
        console.log(this.students);
        this.members = data;
        console.log(this.members);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 600,
    // navText: ['&#8249', '&#8250;'],
    navText: ['', ''],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1200: {
        items: 3
      },
      1400: {
        items: 4
      }
    },
    nav: true
  }

}
