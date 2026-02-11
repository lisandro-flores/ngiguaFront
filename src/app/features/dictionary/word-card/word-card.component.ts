import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Word, ApiService } from '../../../core/services/api.service';

@Component({
    selector: 'app-word-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './word-card.component.html',
    styleUrls: ['./word-card.component.css']
})
export class WordCardComponent {
    @Input({ required: true }) word!: Word;
    @Input() compact = false;
    @Input() truncateDefinitions = 2;

    @Output() select = new EventEmitter<Word>();
    @Output() report = new EventEmitter<{ wordId: string; term: string }>();

    getIconKey(type?: string): string {
        const lowerType = (type || '').toLowerCase();
        switch (lowerType) {
            case 'sustantivo': return 'sustantivo';
            case 'verbo': return 'verbo';
            case 'adjetivo': return 'adjetivo';
            case 'adverbio': return 'adverbio';
            case 'pronombre': return 'pronombre';
            case 'preposición':
            case 'conjunción': return 'preposition';
            case 'interjección': return 'interjeccion';
            default: return 'default';
        }
    }

    getBadgeClass(type?: string): string {
        const key = this.getIconKey(type);
        const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ';
        switch (key) {
            case 'sustantivo':
                return base + 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700';
            case 'verbo':
                return base + 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700';
            case 'adjetivo':
                return base + 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700';
            case 'adverbio':
                return base + 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700';
            default:
                return base + 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';
        }
    }

    private api = inject(ApiService);
    voting = false;

    get visibleDefinitions(): string[] {
        if (!this.word.definitions) return [];
        return this.compact ? this.word.definitions.slice(0, this.truncateDefinitions) : this.word.definitions;
    }

    onVote(ev: Event) {
        ev.stopPropagation();
        if (this.voting || !this.word._id) return;

        this.voting = true;
        // Optimistic update
        const originalVotes = this.word.votes || 0;
        this.word.votes = originalVotes + 1;

        this.api.vote(this.word._id).subscribe({
            next: (updatedWord) => {
                this.word.votes = updatedWord.votes;
                this.voting = false;
            },
            error: () => {
                // Revert
                this.word.votes = originalVotes;
                this.voting = false;
            }
        });
    }

    playAudio(ev: Event) {
        ev.stopPropagation();
        if (!this.word.audioUrl) return;

        const audio = new Audio(this.api.resolveUrl(this.word.audioUrl));
        audio.play().catch(err => console.error('Error playing audio:', err));
    }

    onReport(ev: Event) {
        ev.stopPropagation();
        if (this.word._id) {
            this.report.emit({ wordId: this.word._id, term: this.word.term });
        }
    }

    onSelectCard() {
        this.select.emit(this.word);
    }

    onKeyEnter() {
        this.select.emit(this.word);
    }
}
