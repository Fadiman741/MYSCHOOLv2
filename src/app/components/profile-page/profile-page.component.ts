  import { Component, OnInit } from '@angular/core';
  import { ApiService } from '../../services/api.service';
  import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
  import { NgFor } from '@angular/common';
  import { TimelineComponent } from "../timeline/timeline.component";
  import { ActivatedRoute } from '@angular/router';
  // import { ApiService } from 'src/app/services/api.service';


  @Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css'],
    imports: [PagetiltleComponent, NgFor, TimelineComponent],
    standalone:true,
  })
  export class ProfilePageComponent implements OnInit {
    
    breadCrumbItems: Array<{}> = [];
    currentUser: any;
    user: any;
    
    constructor(private apiservice: ApiService,private route: ActivatedRoute) { 
    
    }

    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Home' }, { label: 'Profile', active: true }];
      var userId = this.route.snapshot.params['id'];
      console.log(userId);
      this.apiservice.getUser(userId).subscribe(
        (response) => {
          this.user = response;
          console.log(this.user);
        },
        (error) => {}
      );
    }
  }
