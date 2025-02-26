import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
// import { NavbarComponent } from "../../../components/cards/navbar/navbar.component";
import { FooterComponent } from "../../../components/cards/footer/footer.component";
import { NavbarComponent } from '../../../components/Navbar/Navbar.component';
import { HomepageComponent } from '../../../components/homepage/homepage.component';

@Component({
  selector: 'app-landing-type-01',
  imports: [RouterOutlet,RouterLink, NavbarComponent,  FooterComponent],
  standalone:true,
  templateUrl: './landing-type-01.component.html',
  styleUrl: './landing-type-01.component.css'
})
export class LandingType01Component {

}
