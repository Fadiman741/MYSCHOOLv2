import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { PagetiltleComponent } from "../../pagetiltle/pagetiltle.component";
import { LastSeenPipe } from "../../../pipes/lastSeen/lastSeen.pipe";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.css'],
  standalone:true,
  imports: [PagetiltleComponent,NgFor, LastSeenPipe, NgIf,NgClass, TimelineComponent,MatIconModule,MatMenuModule,QuillModule,FormsModule]
})
export class ViewAnnouncementComponent implements OnInit {
  announcement: any;
  announcements: any;
  showDropdown: any;
  breadCrumbItems: Array<{}> = [];
  sanitizedDescription!: string;

  constructor(private route: ActivatedRoute,private apiservice: ApiService,private router:Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home page' },{ label: 'Annoucement' }];

    const announcement_Id = this.route.snapshot.paramMap.get('id');
    console.log(announcement_Id)
    if (announcement_Id) {
      // Fetch announcement details
      this.apiservice.getAnnouncement(announcement_Id).subscribe((data: any) => {
        if (data && data.description) {
          // Sanitize the HTML description
          this.sanitizedDescription = this.sanitizer.sanitize(SecurityContext.HTML, data.description) || '';
          
          // Assign the data to the announcement object
          this.announcement = {
            ...data,
            description: this.sanitizedDescription
          };
        }
        // console.log('Announcement Data:', this.announcement);
      });
    } else {
      console.error('No announcement ID found in the route.');
    }
    


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
  likePost(post: any) {
    this.apiservice.likeAnnouncement(post.id).subscribe(response => {
      if (response.status === "liked") {
        post.like_count += 1;
        post.user_has_liked = true;
      } else {
        post.like_count -= 1;
        post.user_has_liked = false;
      }
    });
  }
  newComment: string = '';
  newReply: string = '';
  showReplyBox: string | null = null;
  showReplies: string | null = null;

  // Method to add a new comment
  addComment() {
    if (this.newComment.trim()) {
      const newComment = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        user: this.announcement.user, // Use the current user
        content: this.newComment,
        created_at: new Date().toISOString(),
        replies: [],
      };
      this.announcement.comments.push(newComment);
      this.newComment = ''; // Clear the input
    }
  }

  // Method to toggle the reply input box
  toggleReply(commentId: string) {
    this.showReplyBox = this.showReplyBox === commentId ? null : commentId;
  }

  // Method to add a reply to a comment
  addReply(commentId: string) {
    if (this.newReply.trim()) {
      const comment = this.announcement.comments.find((c:any) => c.id === commentId);
      if (comment) {
        const newReply = {
          id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
          user: this.announcement.user, // Use the current user
          content: this.newReply,
          created_at: new Date().toISOString(),
        };
        comment.replies.push(newReply);
        this.newReply = ''; // Clear the input
        this.showReplyBox = null; // Hide the reply box
      }
    }
  }
  // // Toggle reply input box
  // toggleReply(commentId: string): void {
  //   this.showReplyBox = this.showReplyBox === commentId ? null : commentId;
  // }

  // Toggle visibility of replies
  toggleReplies(commentId: string): void {
    this.showReplies = this.showReplies === commentId ? null : commentId;
  }

  // Add a reply to a comment
  // addReply(commentId: string): void {
    // if (this.newReply.trim()) {
    //   this.announcementService.addReply(commentId, this.newReply).subscribe((reply) => {
    //     const comment = this.announcement.comments.find((c: any) => c.id === commentId);
    //     if (comment) {
    //       comment.replies.push(reply);
    //       this.newReply = ''; // Clear the input
    //       this.showReplyBox = null; // Hide the reply box
    //     }
    //   });
    // }
  // }

  // Like a comment
  likeComment(commentId: string): void {
    // this.announcementService.likeComment(commentId).subscribe((updatedComment) => {
    //   const comment = this.announcement.comments.find((c: any) => c.id === commentId);
    //   if (comment) {
    //     comment.like_count = updatedComment.like_count;
    //     comment.user_has_liked = updatedComment.user_has_liked;
    //   }
    // });
  }

  // Like a reply
  likeReply(replyId: string): void {
    // this.announcementService.likeReply(replyId).subscribe((updatedReply) => {
    //   for (const comment of this.announcement.comments) {
    //     const reply = comment.replies.find((r: any) => r.id === replyId);
    //     if (reply) {
    //       reply.like_count = updatedReply.like_count;
    //       reply.user_has_liked = updatedReply.user_has_liked;
    //       break;
    //     }
    //   }
    // });
  }
}
