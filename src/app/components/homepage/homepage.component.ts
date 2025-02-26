import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../services/api.service';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { LastSeenPipe } from "../../pipes/lastSeen/lastSeen.pipe";
import { TimelineComponent } from "../timeline/timeline.component";
import { FooterComponent } from "../cards/footer/footer.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [CommonModule, PagetiltleComponent, LastSeenPipe, TimelineComponent, CarouselModule, FontAwesomeModule, NgFor, NgStyle,MatIconModule],
  standalone:true,
  // providers: [ApiService],
})
export class HomepageComponent implements OnInit {
  
  breadCrumbItems: Array<{}> = [];
  
  tutors: any;
  tutorlist: any;
  institutions:any;
  members:any;
  students: any;
  announcements: any;

  backgroundStyle = {
    'background-image': `linear-gradient(45deg, #141c3cc4, rgba(8, 83, 156, 0.15)), 
                          url('https://media.istockphoto.com/id/1000887536/photo/back-view-of-elementary-students-raising-their-arms-on-a-class.jpg?s=612x612&w=0&k=20&c=i0PBNmY4nSgOhHyy9AU5OAiJrOsHk7f7jLcNkO6CApE=')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  constructor( private apiservice:ApiService,private router:Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home page' }];
    this.getTutors();
    this.getAnnouncements();
  }
    getAnnouncements = () => {
    this.apiservice.getAllAnnouncements().subscribe(
      data => {
        this.announcements = data.slice(0, 4);
        this.cdr.detectChanges();
        console.log(this.announcements);
      },
      error => {
        console.log(error);
      }
    );
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
  navigateToViewAnnouncement(id: number): void {
    this.router.navigate(['view-announcement/', id]);
  }
}
