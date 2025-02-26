import { NgFor } from '@angular/common';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [NgFor],
  standalone:true,
})
export class NotificationsComponent implements OnInit {


  breadCrumbItems: Array<{}> = [];
  isReadMore: true = true;
  notifications:any;
  count:any;

  lastCheckTime: any;
  
  constructor(private apiservice: ApiService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Notifications', active: true }];
    // this.lastCheckTime = new Date().toISOString();
    // this.checkForAnnouncements();
    
    this.getNotifications();

    // Poll for new notifications every 60 seconds
    setInterval(() => {
      this.getNotifications();
    }, 60000);


    

  }
  getNotifications(){
    this.apiservice.getAllNotifications().subscribe((data)=>{
      this.notifications=data;
      this.count = data.length;
    })
  }
  checkForAnnouncements() {
    this.apiservice.getNewAnnouncements(this.lastCheckTime).subscribe(announcements => {
        if (announcements.length > 0) {
          // Display notifications to the user here
        }
        this.lastCheckTime = new Date().toISOString();
        setTimeout(() => this.checkForAnnouncements(), 5000); // Poll every 5 seconds
      });
  }

}
