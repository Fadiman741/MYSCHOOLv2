import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  imports: [],
  standalone:true,
})
export class DropdownComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() label: string = '';

  constructor() { }

  ngOnInit() {
  }

}
