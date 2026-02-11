import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Output() search = new EventEmitter<{ query: string; mode: 'precise' | 'suggestions' }>();
  @Input() loading = false;
  private searchSubject = new Subject<string>();
  mode: 'precise' | 'suggestions' = 'suggestions';
  private lastQuery = '';
  isFocused = false;

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.lastQuery = query;
      this.search.emit({ query, mode: this.mode });
    });
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  onToggleMode(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.mode = checked ? 'precise' : 'suggestions';
    // Re-emit current query immediately so results update when mode changes
    this.search.emit({ query: this.lastQuery, mode: this.mode });
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    // Delay hiding so clicks on buttons don't get lost
    setTimeout(() => this.isFocused = false, 200);
  }

  insertChar(char: string) {
    const input = this.searchInput.nativeElement;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const value = input.value;

    const newValue = value.substring(0, start) + char + value.substring(end);
    input.value = newValue;

    // Move cursor after inserted char
    input.selectionStart = input.selectionEnd = start + char.length;
    input.focus();

    // Trigger search update
    this.searchSubject.next(newValue);
  }
}
