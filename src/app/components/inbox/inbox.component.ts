import { Component, OnInit } from '@angular/core';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
import { ChatComponent } from "../chat/chat.component";
import { ChatWindowComponent } from "../chat-window/chat-window.component";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  imports: [PagetiltleComponent, ChatComponent, ChatWindowComponent],
  standalone:true,
})
export class InboxComponent implements OnInit {
  
  breadCrumbItems: Array<{}> = [];
  isReadMore: true = true;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Inbox', active: true }];

  }

}
