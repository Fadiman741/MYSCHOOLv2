import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { Title, Meta } from '@angular/platform-browser';


// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
  imports: [PagetiltleComponent, CarouselModule, FontAwesomeModule, TimelineComponent,NgFor,MatIconModule,RouterLink],
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


  constructor(private apiservice: ApiService, private router:Router,private titleService: Title,private metaService: Meta) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Tutoring', active: true }];
    this.getTutors();

    
  // Set SEO Title
  this.titleService.setTitle('Find Top Tutors | Tutoring Services | MySchool');

  // Set SEO Meta Description
  this.metaService.updateTag({
    name: 'description',
    content: 'Discover top tutors and educational institutions offering tutoring services to help you excel. Find the best match for your academic needs.'
  });

  // Optionally add keywords (though not as important today)
  this.metaService.updateTag({
    name: 'keywords',
    content: 'Tutors, Tutoring, Education, Institutions, Private Tutor, Study Help'
  });

  // Open Graph Tags for social media sharing (optional)
  this.metaService.updateTag({
    property: 'og:title',
    content: 'Find Top Tutors | YourSiteName'
  });
  this.metaService.updateTag({
    property: 'og:description',
    content: 'Discover top tutors and institutions offering tutoring services tailored to your needs.'
  });
  this.metaService.updateTag({
    property: 'og:type',
    content: 'website'
  });


  }
  openTutors(){
    this.router.navigate(['/tutors']);
  }
    getTutors = () => {
    this.apiservice.getAllTutors().subscribe(
      (data) => {
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
