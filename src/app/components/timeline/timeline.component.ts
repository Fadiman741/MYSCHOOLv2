import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  imports: [NgStyle],
  standalone:true,
})
export class TimelineComponent implements OnInit {

  backgroundStyle = {
    'background-image': `linear-gradient(45deg, #141c3cc4, rgba(8, 83, 156, 0.15)), 
                          url('https://media.istockphoto.com/id/1000887536/photo/back-view-of-elementary-students-raising-their-arms-on-a-class.jpg?s=612x612&w=0&k=20&c=i0PBNmY4nSgOhHyy9AU5OAiJrOsHk7f7jLcNkO6CApE=')`,
    'background-position': 'center',
    'background-size': 'cover',
  };

  constructor() { }

  ngOnInit() {
  }

}
