import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewpostmodalComponent } from '../components/discusion-forum/viewpostmodal/viewpostmodal.component';
// import { ViewAnnoucementComponent } from '../components/modals/view-annoucement/view-annoucement.component';
import { CreateAnnoucementComponent } from '../components/modals/create-annoucement/create-annoucement.component';
import { CreatePostComponent } from '../components/modals/create-post/create-post.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
constructor(private dialog: MatDialog) {}

  ViewPost() {
    this.dialog.open(ViewpostmodalComponent, {
      width: '800px',
    });
  }
  // ViewAnnoucement() {
  //   this.dialog.open(ViewAnnoucementComponent, {
  //     width: '800px',
  //   });
  // }
  CreateAnnoucement() {
    this.dialog.open(CreateAnnoucementComponent, {
      width: '800px',
    });
  }
  CreatePost() {
    this.dialog.open(CreatePostComponent, {
      width: '800px',
    });
  }
}
