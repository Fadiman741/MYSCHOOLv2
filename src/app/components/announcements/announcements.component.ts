import { Component, OnInit,ViewChild,Input } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';
import {  } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalServiceService } from '../../modal-services/modal-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAnnoucementComponent } from '../modals/edit-annoucement/edit-annoucement.component';
import { ApiService } from '../../services/api.service';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LastSeenPipe } from "../../pipes/lastSeen/lastSeen.pipe";
import { CreateAnnoucementComponent } from '../modals/create-annoucement/create-annoucement.component';
import { TimelineComponent } from "../timeline/timeline.component";


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
  standalone:true,
  imports: [PagetiltleComponent, NgClass, LastSeenPipe, NgFor, NgIf, TimelineComponent],
})
export class AnnouncementsComponent implements OnInit {

  @Input() lastSeen: Date | undefined;
  public view: any = {
    
  }

  breadCrumbItems: Array<{}> = [];
  isReadMore: true = true;
  announcements: any;

  showReplies = false;
  showDropdown = false;

  constructor(public dialog: MatDialog,private apiservice: ApiService,private router:Router,private ModalServiceService:ModalServiceService) { }
  @ViewChild('announcementForm') signupForm!: any;

  isCollapsed = true; // Start with collapsed state

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Announcement', active: true }];
    this.getAnnouncements();
      this.apiservice.getCurrentUser().subscribe(
        response => {
          this.view.currentUser = response;
          console.log(this.view.currentUser)
        },
        error => {
          console.error('Error:', error);
        }
    );
  }

  showText() {
    this.isReadMore != this.isReadMore;
  }

  getAnnouncements = () => {
    this.apiservice.getAllAnnouncements().subscribe(
      data => {
        this.announcements = data;
        console.log(this.announcements);
      },
      error => {
        console.log(error);
      }
    );
  }
  onAnnoucementSubmit(form: any) {
    if (form.valid) {
      const announcement = {
        title: form.value.title,
        description: form.value.description,
      };
      this.apiservice.create_announcement(announcement).subscribe(
        (response) => {
          console.log('Announcement posted successful:', response);
          // Handle successful, e.g., show a success message to the user
          // this.router.navigate(["announcement/"])
          this.announcements=[]
          this.getAnnouncements()
          form.resetForm();
        },
        (error) => {
          console.error('Announcement failed:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    }
  }
  onDeleteAnnouncement = (announcementId: any) =>{
    this.apiservice.deleteAnnouncement(announcementId).subscribe(
      () => {
        console.log('Item deleted successfully');
        
        this.announcements = this.announcements.filter((post: { id: any; }) => post.id !== announcementId)
        // Handle any other actions after successful deletion
      },
      (error) => {
        console.error('Error deleting item:', error);
        // Handle errors
      }
      )
  }
  editItem(id:number) {
    // Implement your edit logic here
    console.log('Edit item clicked');
  }
  viewAnnouncement(data: any) {
    this.router.navigate(['annoucement', data.id]);
  }

  createAnnoucement(): void {
    const dialogRef = this.dialog.open(CreateAnnoucementComponent, {
      width: '600px',
      data: {  }  // Pass the current announcement to the modal
    })
      // this.ModalServiceService.CreateAnnoucement();
  }
  openEditModal(announcement: any): void {
    const dialogRef = this.dialog.open(EditAnnoucementComponent, {
      width: '600px',
      data: { announcement }  // Pass the current announcement to the modal
    });
  }
}