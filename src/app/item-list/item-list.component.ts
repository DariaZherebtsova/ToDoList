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
  itemListMemos: Memo[];
  newItem: Memo;
  fAddItem: Boolean = false;
  fPlus: Boolean = true;
  addValue: String = '';

  @Input() id = +this.route.snapshot.paramMap.get('id');

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
      this.itemListMemos = this.currList.memos;
    });
  }

  onSelect(item: Memo): void {
    item.done = item.done ? false : true;
  }

  addItem(): void {
    this.fAddItem = true;
    this.fPlus = false;
  }

  setNewMemo(newMemo: String): void {
    this.fAddItem = false;
    this.fPlus = true;
    const newItem: Memo = { done: false, text: newMemo };
    this.itemListMemos.push(newItem);
    this.currList.memos = this.itemListMemos;
    this.dataService.updateList(this.currList)
     .subscribe(() => { console.log('***success updateList', this.currList.memos); });
  }

  delete (item: Memo): void {
    this.itemListMemos = this.itemListMemos.filter(memo => memo !== item);
    this.currList.memos = this.itemListMemos;
    this.dataService.updateList(this.currList)
     .subscribe(() => { console.log('***success updateList', this.currList.memos); });
  }

  // onEnter(value: string) {
  //   this.newItem = { done: false, text: value };
  //   this.itemList.push(this.newItem);
  //   this.addValue = ' ';
  // }

}
