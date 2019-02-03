import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { List } from '../list';
// import { LISTLISTS } from '../mock-lists';
import { DataService } from '../data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Location } from '@angular/common';
// import { appSetFocus } from '../set-focus.directive';

@Component({
  selector: 'app-list-lists',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '30px',
        opacity: 1
      })),
      state('closed', style({
        height: '0',
        opacity: 0
        // backgroundColor: 'rgb(157, 201, 216)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0s')
      ]),
    ]),
  ],
  templateUrl: './list-lists.component.html',
  styleUrls: ['./list-lists.component.css']
})
export class ListListsComponent implements OnInit {

  lists: List[];
  isOpen = false;
  addInput = false;
  // addNew = false;
  newList: List;
  cleanValue: String = '';
  @ViewChild('addNewList') addNewList: ElementRef;

  constructor(private dataService: DataService, private location: Location) { }

  ngOnInit() {
    console.log('ListListsComponent ngOnInit');
    this.getLists();
  }

  getLists(): void {
    this.dataService.getLists()
        .subscribe(lists => this.lists = lists);
  }

  onSelect(list: List) {
    list.isOpen = !list.isOpen;
  }

  onPlus() {
    // this.addInput = true;
    // this.addNewList.nativeElement.focus();
    this.newList = {
      id: this.lists.length + 1,
      name: 'new list',
      memos: [],
      done: false,
      isOpen: true,
      isNew: true };
    this.lists.push(this.newList);
    // this.addNew = true;
  }

  onEnter(value: string) {
    this.newList = {
      id: this.lists.length + 1,
      name: value,
      memos: [],
      done: false,
      isOpen: false,
      isNew: true };
    this.lists.push(this.newList);
    this.cleanValue = ' ';
    this.addInput = false;

    console.log('onEnter ');
    this.dataService.updateData(this.newList)
     .subscribe(() => console.log('update done '));
    //  .subscribe(() => this.goBack());
  }

  setNewName(value: string, list: List) {
    list.name = value;
    list.isNew = false;
  }

  goBack(): void {
    this.location.back();
  }

}
 
