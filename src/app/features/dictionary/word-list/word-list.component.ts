import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word } from '../../../core/services/api.service';
import { WordCardComponent } from '../word-card/word-card.component';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [CommonModule, WordCardComponent],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.css'
})
export class WordListComponent {
  private _words: Word[] = [];

  @Input()
  set words(value: (Word | null | undefined)[]) {
    this._words = Array.isArray(value) ? value.filter(Boolean) as Word[] : [];
    const nullCount = Array.isArray(value) ? value.filter(v => !v).length : 0;
    if (nullCount > 0) {
      console.warn(`WordListComponent: filtered ${nullCount} null/undefined items from words input.`);
    }
  }

  get words(): Word[] {
    return this._words;
  }
  @Input() compact = false;
  @Input() loading = false;
  @Input() truncateDefinitions = 2;
  @Output() report = new EventEmitter<{ wordId?: string; term?: string }>();
  @Output() select = new EventEmitter<Word>();

  // Modal state for expanded card
  selectedWord?: Word | null = null;

  openModal(word: Word) {
    this.selectedWord = word;
  }

  closeModal() {
    this.selectedWord = null;
  }

  onReport(event: { wordId: string; term: string }) {
    this.report.emit(event);
  }

  onSelect(word: Word) {
    this.select.emit(word);
  }
}
