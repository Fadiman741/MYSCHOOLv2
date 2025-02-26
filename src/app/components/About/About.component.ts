import { Component, OnInit } from '@angular/core';
import { faLayerGroup,faAddressCard,faUsers,faBook} from '@fortawesome/free-solid-svg-icons';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';



@Component({
  selector: 'app-About',
  templateUrl: './About.component.html',
  standalone:true,
  imports: [PagetiltleComponent, FontAwesomeModule, FooterComponent,RouterLink,NgStyle],
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

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'About', active: true }];
  }

}
