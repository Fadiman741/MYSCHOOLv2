import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ApiService } from 'src/app/services/api.service';
import {  } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { PagetiltleComponent } from "../../pagetiltle/pagetiltle.component";
import { LastSeenPipe } from "../../../pipes/lastSeen/lastSeen.pipe";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TimelineComponent } from "../../timeline/timeline.component";
import { MatIconModule } from '@angular/material/icon';
import { EditPostComponent } from '../../modals/edit-post/edit-post.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  imports: [PagetiltleComponent, LastSeenPipe, NgIf, NgFor, TimelineComponent, NgClass, MatIconModule,],
  standalone:true,
  
})
export class ViewPostComponent implements OnInit {

  public view: any = {
    
  }
  post_id: any;
  post: any;
  // grade: string | null = '';
  // subject: string | null = '';
  // id: string | null = '';
  

  breadCrumbItems: Array<{}> = [];

  constructor(private route: ActivatedRoute,private apiservice:ApiService,public dialog: MatDialog) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home page' },{ label: 'grade 10' },{ label: 'Mathematics' }];

    this.view.postId = this.route.snapshot.paramMap.get('id');

    this.apiservice.getPostById(this.view.postId).subscribe((data: any) => {
      this.view.post = data;
      console.log( 'post',this.view.post)

      // this.post_id = this.post.id
    });
    // this.apiservice.getCommentsByPost(this.view.postId).subscribe((data: any) => {
    //   this.view.comments = data;
    //   console.log("Comments",this.view.comments)

    //   // this.post_id = this.post.id
    // });
    // console.log(this.post_id)
    // ================================================
    // this.route.paramMap.subscribe(params => {
    //   this.grade = params.get('grade');
    //   this.subject = params.get('subject');
    //   this.id = params.get('id');
    //   console.log('Grade:', this.grade, 'Subject:', this.subject, 'ID:', this.id); // Debugging output
    // });
    // ===============================================================
  }

  // onComment(form: , postId: number) {
  //   if (form.valid) {
  //       const commentData = {
  //       content: form.value.comment,
  //     };
  //     this.apiservice.create_comments(this.view.postId, commentData).subscribe(
  //       (response) => {
  //         console.log('Commented successful:', response);
  //         form.resetForm();
  //       },
  //       (error) => {
  //         console.error('Comment failed failed:', error);
  //         // Handle error, e.g., display an error message to the user
  //       }
  //     );
  //   }
  // }
  showCommentForm: boolean = false; // Track if comment form is shown
  showReplyForm: boolean = false;   // Track if reply form is shown

  // Method to toggle the comment form
  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }

  // Method to toggle the reply form
  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

  // Add your existing methods like onComment
  onComment(forumForm: any, post_id: number) {
    // Handle comment form submission
  }
  dropdownOpen: { [key: number]: boolean } = {};
  toggleDropdown(postId: number) {
    this.dropdownOpen[postId] = !this.dropdownOpen[postId];
  }

  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }
  openEditModal(post: any): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '700px',
      data: {post }  // Pass the current announcement to the modal
    });
  }
  toggleLike(item:any) {
    item.isLiked = !item.isLiked;
    item.likes += item.isLiked ? 1 : -1;
  }
  onDeletePost = (postId: any) =>{
    this.apiservice.deletePost(postId).subscribe(
      () => {
        console.log('Item deleted successfully');
        // this.posts = this.posts.filter((post: { id: any; }) => post.id !== postId)
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
      )
  }
}
