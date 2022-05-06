import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from './dropdown.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  _items: Item[] = [];

  @Input() placeholder: any;
  @Input() showSearch = true;
  @Input() showStatus = true;
  @Input() showError = false;
  @Output() itemChange = new EventEmitter<Item>(null as any);

  @Input('items')
  set items(items: Item[]) {
    this._items = items;
    this._items.map((item) => {
      item.visible = item.visible || true;
    });
    this.filtered = [...this._items];
  }

  filtered: Item[] = [];
  item: Item = null as any;

  private searchText = '';

  get search(): string {
    return this.searchText;
  }

  set search(searchText: string) {
    this.searchText = searchText;

    const search = this.searchText.toLowerCase();
    if (!search) {
      this.filtered = [...this._items];
      return;
    }
    this.filtered = this._items.filter(
      (i) => i.name.toLowerCase().indexOf(search) !== -1
    );
  }

  get isEmpty(): boolean {
    return this.filtered.filter((i) => i.visible).length === 0;
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }

  onChange(item: Item): void {
    this.item = item;
    this.itemChange.emit(item);
  }

  constructor() {}

  ngOnInit(): void {}
}
