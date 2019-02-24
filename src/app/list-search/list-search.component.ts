import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { List } from '../list';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css']
})
export class ListSearchComponent implements OnInit {
  lists$: Observable<List[]>;
  private searchTerms = new Subject<string>();

  constructor(private dataService: DataService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log('***', term);
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    console.log('***list-search ngOnInit');
    this.lists$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.dataService.searchLists(term)),
    );
  }
}
