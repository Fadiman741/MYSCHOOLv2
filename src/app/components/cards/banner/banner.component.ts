import { Component } from '@angular/core';
import { PagetiltleComponent } from "../../pagetiltle/pagetiltle.component";
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from "../../timeline/timeline.component";

@Component({
  selector: 'app-banner',
  imports: [PagetiltleComponent, RouterOutlet, TimelineComponent],
  standalone:true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  breadCrumbItems: Array<{}> = [];

}
