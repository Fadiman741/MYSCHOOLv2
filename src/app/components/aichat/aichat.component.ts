import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { TimelineComponent } from "../timeline/timeline.component";
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-aichat',
  templateUrl: './aichat.component.html',
  styleUrls: ['./aichat.component.css'],
  standalone:true,
  imports: [FormsModule, TimelineComponent, PagetiltleComponent],
})
export class AichatComponent implements OnInit {
  breadCrumbItems: Array<{}> = [];

  constructor(private apiservice: ApiService) { }

  ngOnInit() {
  }
  userMessage: string = '';
  botResponse: string = '';



  sendMessage() {
    if (this.userMessage.trim()) {
      this.apiservice.Ai_chat(this.userMessage).subscribe((response: { response: string; }) => {
        this.botResponse = response.response;
      });
    }
  }
}
