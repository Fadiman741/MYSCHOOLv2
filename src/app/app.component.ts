import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/cards/footer/footer.component";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myschool';
  loggedInUser: any;
  

  constructor(private apiservice:ApiService) {
    this.loggedInUser = apiservice.getLoggedInUser();
  }


  ngOnInit(){
    // this.loggedInUser = localStorage.getItem('loggedInUser');
    console.log(this.loggedInUser);

    // if(this.loggedInUser == ''){
    //   this.loggedInUser == null;
    // }
  }
}
