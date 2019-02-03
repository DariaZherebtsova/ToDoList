import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Memo } from '../memo';
import { List } from '../list';
import { DataService } from '../data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  lists: List[];
  currList: List;
  itemList: Memo[];
  newItem: Memo;
  fAddItem: Boolean = false;
  addValue: String = '';

  @Input() id = 1;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dataService: DataService) { }

  ngOnInit() {
    this.getList(this.id);
  }

  getList(id: number): void {
    this.dataService.getList(id)
    .subscribe(list => {
      this.currList = list;
      this.itemList = this.currList.memos;
    });
  }

  onSelect(item: Memo): void {
    item.done = item.done ? false : true;
  }

  addItem(): void {
    this.newItem = { done: false, text: '' };
    this.itemList.push(this.newItem);
    this.fAddItem = true;
  }

  onEnter(value: string) {
    this.newItem = { done: false, text: value };
    this.itemList.push(this.newItem);
    this.addValue = ' ';
  }

}
