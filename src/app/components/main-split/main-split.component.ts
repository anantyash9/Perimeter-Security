import { Component, OnInit } from '@angular/core';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-main-split',
  templateUrl: './main-split.component.html',
  styleUrls: ['./main-split.component.css']
})
export class MainSplitComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
