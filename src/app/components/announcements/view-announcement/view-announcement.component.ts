import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { PagetiltleComponent } from "../../pagetiltle/pagetiltle.component";
import { LastSeenPipe } from "../../../pipes/lastSeen/lastSeen.pipe";
import { NgIf } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css'],
  standalone:true,
  imports: [PagetiltleComponent, LastSeenPipe, NgIf, TimelineComponent,MatIconModule,MatMenuModule,QuillModule]
})
export class ViewAnnouncementComponent implements OnInit {
  announcement: any;
  announcements: any;
  showDropdown: any;
  breadCrumbItems: Array<{}> = [];

  constructor(private route: ActivatedRoute,private apiservice: ApiService,private router:Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home page' },{ label: 'Annoucement' }];

    const announcement_Id = this.route.snapshot.paramMap.get('id');
    console.log(announcement_Id)
    this.apiservice.getAnnouncement(announcement_Id).subscribe((data: any) => {
      if (data && data.description) {
        this.announcement = {
          ...data,
          description: this.sanitizer.bypassSecurityTrustHtml(data.description), 
        };
      }
      console.log(this.announcement);
    });
    


//     if (announcementId !== null) {
//   const idNumber = Number(announcementId);
//   if (!isNaN(idNumber)) {
//     this.apiservice.getAnnouncement(idNumber).subscribe((data: any) => {
//       this.announcement = data;
//       console.log(this.announcement);
//     });
//   } else {
//     console.error('Invalid announcement ID:', announcementId);
//   }
// } else {
//   console.error('Announcement ID is null.');
// }

  }
  onDeleteAnnouncement = (announcementId: any) =>{
    this.apiservice.deleteAnnouncement(announcementId).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.announcements = this.announcements.filter((post: { id: any; }) => post.id !== announcementId)
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
      )
  }
  editItem(id:number) {
    console.log('Edit item clicked');
  }


}
