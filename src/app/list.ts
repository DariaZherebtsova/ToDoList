import { Memo } from './memo';

export class List {
  id: number;
  name: String;
  memos: Memo[];
  done: Boolean = false;
  isOpen: Boolean = false;
  isNew: Boolean = false;
}
