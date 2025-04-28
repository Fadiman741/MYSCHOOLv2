import { Component, OnInit } from '@angular/core';
import { faLayerGroup,faAddressCard,faUsers,faBook} from '@fortawesome/free-solid-svg-icons';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';



@Component({
  selector: 'app-About',
  templateUrl: './About.component.html',
  standalone:true,
  imports: [PagetiltleComponent, FontAwesomeModule,NgStyle],
  styleUrls: ['./About.component.css']
})
export class AboutComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];
  faAddressCard=  faAddressCard
  faUsers=faUsers;
  faBook=faBook;

  backgroundStyle = {
    'background-image': `linear-gradient(45deg, #141c3cc4, rgba(8, 83, 156, 0.15)), 
                          url('https://media.istockphoto.com/id/1000887536/photo/back-view-of-elementary-students-raising-their-arms-on-a-class.jpg?s=612x612&w=0&k=20&c=i0PBNmY4nSgOhHyy9AU5OAiJrOsHk7f7jLcNkO6CApE=')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  constructor(private meta: Meta, private title: Title) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'About', active: true }];

    this.title.setTitle('About Us - Educational Platform Connecting Students & Tutors');
    
    this.meta.addTags([
      { name: 'description', content: 'Learn about our educational platform that connects students, institutions, and tutors through innovative technology and collaborative learning experiences.' },
      { name: 'keywords', content: 'education platform, student portal, tutor matching, learning management, educational technology' },
      { name: 'og:title', content: 'About Our Educational Platform' },
      { name: 'og:description', content: 'Discover how we connect students, institutions, and tutors through innovative technology.' },
      { name: 'og:image', content: 'https://media.istockphoto.com/id/1000887536/photo/back-view-of-elementary-students-raising-their-arms-on-a-class.jpg' },
      { name: 'og:url', content: 'https://yourdomain.com/about' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]);
  }

}
