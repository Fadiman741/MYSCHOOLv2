import { Component, OnInit } from '@angular/core';
import { faEnvelope,faBell,faSquarePhone,faLocationDot,faBookOpen} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { NgFor } from '@angular/common';
//import { faEnvelope} from '@fortawesome/free-regular-svg-icons';
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tutors-list',
  templateUrl: './tutors-list.component.html',
  styleUrls: ['./tutors-list.component.css'],
  imports: [PagetiltleComponent,NgFor],
  standalone:true,
})
export class TutorlistComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];

  faEnvelope=faEnvelope;
  faBell=faBell;
  faSquarePhone=faSquarePhone;
  faLocationDot=faLocationDot;
  faBookOpen=faBookOpen;


  tutors:any;
  institutions:any;
  members:any;
  students:any



  constructor( private apiservice:ApiService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Tutoring' },{ label: 'Tutors', active: true }];
    this.getTutors();
  }
  getTutors = () => {
    this.apiservice.getAllUsers().subscribe(
      (data) => {
        this.institutions = data.filter((user: { occupation: string; }) => user.occupation === 'Institution');
        console.log(this.institutions);
        this.tutors = data.filter((user: { occupation: string; }) => user.occupation === 'Tutor');
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
}
