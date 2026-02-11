import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, Word } from '../../core/services/api.service';
import { SearchBarComponent } from '../dictionary/search-bar/search-bar.component';
import { WordListComponent } from '../dictionary/word-list/word-list.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, SearchBarComponent, WordListComponent, RouterLink],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    words: Word[] = [];
    randomWord?: Word;
    loading = false;

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.loading = true;
        // Fetch a random word to show initially
        this.api.getRandom().subscribe({
            next: (word) => {
                this.randomWord = word;
                this.words = [word];
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    onSearch(event: { query: string; mode: 'precise' | 'suggestions' }) {
        const query = event.query;
        // mode is ignored for now in this simple view, or we could pass it to api
        if (!query.trim()) {
            if (this.randomWord) this.words = [this.randomWord];
            return;
        }

        this.loading = true;
        // Pass mode to search
        this.api.search(query, event.mode).subscribe({
            next: (results) => {
                this.words = results;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
