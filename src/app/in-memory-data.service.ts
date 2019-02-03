import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { List } from './list';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      {
        id: 1,
        name: 'Важные дела',
        memos: [
          { done: true, text: 'слепить снеговика' },
          { done: false, text: 'заморозить мыльный пузырь' },
          { done: false, text: 'сделать воздушного змея' }],
        done: false,
        isOpen: false,
        isNew: false
      },
      {
        id: 2,
        name: 'Продукты',
        memos: [
          { done: false, text: 'манго' },
          { done: false, text: 'авокадо' },
          { done: false, text: 'личи' }],
        done: false,
        isOpen: false,
        isNew: false
      },
      {
        id: 3,
        name: 'Котику',
        memos: [
          { done: false, text: 'вкусняшку' },
          { done: false, text: 'игрушку' },
          { done: false, text: 'стружку' }],
        done: false,
        isOpen: false,
        isNew: false
      }
    ];
    return {lists};
  }

   // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }

}
