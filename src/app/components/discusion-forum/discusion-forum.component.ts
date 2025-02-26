import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/services/api.service';
// import { ModalServiceService} from '../../modal-services/modal-service.service'
import {  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../modals/create-post/create-post.component';
import { EditPostComponent } from '../modals/edit-post/edit-post.component';
import { ApiService } from '../../services/api.service';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LastSeenPipe } from "../../pipes/lastSeen/lastSeen.pipe";
import { MatIconModule } from '@angular/material/icon';
import { TimelineComponent } from "../timeline/timeline.component";


@Component({
  selector: 'app-discusion-forum',
  templateUrl: './discusion-forum.component.html',
  styleUrls: ['./discusion-forum.component.css'],
  imports: [NgFor, NgIf, LastSeenPipe, NgClass, MatIconModule, TimelineComponent, PagetiltleComponent],
  standalone:true,
})
export class DiscusionForumComponent implements OnInit {

  public view :any ={
  
  }

  breadCrumbItems: Array<{}> = [];
  loggedInUser!: string | null;
  posts: any = [];

  showReplies = false;
  showDropdown = false;
  announcements: any;

  grade: any;
  subject: any;newgrade: any;
  newsubject: any;
;
  id: any;;

  currentUser: any;

  constructor(private route: ActivatedRoute,private apiservice: ApiService,private router:Router,public dialog: MatDialog ) { }

  ngOnInit() {
    // this.breadCrumbItems = [{ label: 'Home page' },{ label: 'grade 10' },{ label: 'Mathematics' }];
    // this.loggedInUser = localStorage.getItem('loggedInUser');
    // console.log(this.loggedInUser);

    this.route.params.subscribe(params => {

    this.view.gradeId = params['gradeId'];
    this.view.subjectId = params['subjectId'];
    this.view.grade = this.makeOneWord(params['grade']).toLowerCase();
    this.view.subject = this.makeOneWord(params['subject']).toLowerCase();
    this.loadPosts();
    });

    if(this.loggedInUser == ''){
      this.loggedInUser == null;
    }
    this.getAnnouncements();

    this.apiservice.getCurrentUser().subscribe(
      response => {
        this.currentUser = response;
        console.log(this.currentUser)
      },
      error => {
        console.error('Error:', error);
      }
    );

    this.breadCrumbItems = [{ label: 'Home page' },{ label: this.view.grade  },{ label: this.view.subject }];
    
   
  }
  //  fetchComments(postId: number): void {
  //     this.apiservice.getCommentsByPost(postId).subscribe((data: any) => {
  //       this.view.comments = data;
  //       console.log("Comments for Post ID", postId, this.view.comments);
  //     }, error => {
  //       console.error('Error fetching comments:', error);
  //     });
  //   }
  toggleLike(item:any) {
    item.isLiked = !item.isLiked;
    item.likes += item.isLiked ? 1 : -1;
  }
  makeOneWord(input: string): string {
    return input.replace(/\s+/g, '');
  }
  // ---------------------------------------------------------

  // ---------------------------------------------------------

  loadPosts(): void {
  this.apiservice.getPosts(this.view.gradeId, this.view.subjectId, this.view.grade, this.view.subject).subscribe(posts => {
    this.posts = posts;
    // Iterate through each post and fetch comments
    this.posts.forEach((post: any) => {
      this.apiservice.getCommentsByPost(post.id).subscribe((comments: any) => {
        post.commentCount = comments.length; // Store the comment count in each post
      }, error => {
        console.error('Error fetching comments:', error);
        post.commentCount = 0; // Set to 0 if there is an error fetching comments
      });
    });

  });
}
  getPosts = () => {
    this.apiservice.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        console.log(this.posts);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  getAnnouncements = () => {
    this.apiservice.getAllAnnouncements().subscribe(
      data => {
        this.announcements = data.slice(0, 2);;
        console.log(this.announcements);
      },
      error => {
        console.log(error);
      }
    );
  }
  // createPost(form: ): void {
  //   if (form.valid) { 
  //     const post =  {
  //       content: form.value.description,
  //       grade: this.view.gradeId,
  //       subject: this.view.subjectId
        
  //     // Add other necessary fields like user
  //   };
  //   this.apiservice.createPost(post).subscribe(post => {
  //     this.posts.push(post);
  //   });
  //   }
  // }
  
  
  onDeletePost = (postId: any) =>{
    this.apiservice.deletePost(postId).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.posts = this.posts.filter((post: { id: any; }) => post.id !== postId)
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
      )
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }
  viewPost(data:any) {
    this.router.navigate(['view-post', data.id]);
  }
  view_Post(data: any) {
    this.router.navigate(['forum', this.grade, this.subject, data.id]);
  }
  editItem(id:number) {
    // Implement your edit logic here
    console.log('Edit item clicked');
  }

  deleteItem() {
    // Implement your delete logic here
    console.log('Delete item clicked');
  }

  // toggleComments(post: Post): void {
  //   post.showComments = !post.showComments; // Toggle the showComments property
  // }

  // toggleNestedComments(comment: Comment): void {
  //   comment.showNestedComments = !comment.showNestedComments; // Toggle the showNestedComments property
  // }

  onlikePost(postID: any): void {
    this.apiservice.likePost(postID).subscribe((data: any) => {
      console.log(Response, " Post liked Succesful ")
    }),
    (error: any) => {
      console.error('Error while liking the post', error);
    };
  }

  // unlikePost(post: any): void {
  //   this.apiservice.unlikePost(post.id).subscribe((data: any) => {
  //     post.likes--;
  //   });
  // }
  openModal(): void {
    this.dialog.open(CreatePostComponent, {
      width: '600px'
    });
  }
  openEditModal(post: any): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '700px',
      data: {post }  // Pass the current announcement to the modal
    });
  }
  onforumSubmit(form: any) {
    if (form.valid) {
      const post = {
        content: form.value.description,

      };
      this.apiservice.create_posts(post).subscribe(
        (response) => {
          console.log('Post posted successful:', response);
          // Handle successful, e.g., show a success message to the user
          this.posts=[]
          this.getPosts()
          form.resetForm();
        },
        (error) => {
          console.error('Post failed:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    }
  }
  createPost(form:any ) {
    if (form.valid) {
      const postData  = {
        content: form.value.description,
        grade: this.view.gradeId, // Include gradeId from the view
        subject: this.view.subjectId, // Include subjectId from the view
        // feeling: form.value.feeling,
        // tagged_friends: form.value.taggedFriends, // Ensure this is an array of user IDs
      };
      this.apiservice.createPost(this.view.gradeId, this.view.subjectId, postData).subscribe(
        (response) => {
          console.log('Post posted successful:', response);
          // Handle successful, e.g., show a success message to the user
          // this.postData=[]
          this.getPosts()
          form.resetForm();
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
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
}


