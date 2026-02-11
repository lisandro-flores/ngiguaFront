import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Word } from '../../core/services/api.service';
import { WordCardComponent } from '../dictionary/word-card/word-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fauna',
  standalone: true,
  imports: [CommonModule, WordCardComponent, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-20">
      <!-- Navbar placeholder or back button -->
      <nav class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
           <a routerLink="/" class="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-xl">
             <span class="text-ngigua-500">←</span> Tha — Diccionario Ngigua
          </a>
        </div>
      </nav>

      <div class="container mx-auto px-4 pt-10">
        <header class="mb-12 text-center relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 p-8 md:p-12">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10 dark:opacity-20 bg-cover bg-center" 
                 style="background-image: url('/fauna-header.png');">
            </div>
            
            <div class="relative z-10">
              <h1 class="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-500 mb-4 drop-shadow-sm">
                Naturaleza y Fauna
              </h1>
              <p class="text-slate-700 dark:text-slate-300 text-lg max-w-2xl mx-auto font-medium">
                Explorando el mundo vivo a través del prefijo <span class="font-mono bg-white/50 dark:bg-black/30 px-2 py-1 rounded text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">ku-</span>.
              </p>
            </div>
        </header>

        @if (loading) {
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              <div *ngFor="let n of [1,2,3,4,5,6,7,8]" class="h-48 bg-slate-200 dark:bg-slate-800 rounded-none"></div>
           </div>
        } @else {
           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              @for (animal of animals; track (animal && animal._id) || $index) {
                @if (animal) {
                <app-word-card 
                  [word]="animal" 
                  [compact]="true"
                  class="h-full">
                </app-word-card>
                }
              }
           </div>
           
           @if (animals.length === 0) {
             <div class="text-center py-20" role="status" aria-live="polite">
               <p class="text-slate-500">No se encontraron animales.</p>
             </div>
           }
        }
      </div>
    </div>
  `,
  styles: []
})
export class FaunaComponent implements OnInit {
  private api = inject(ApiService);
  animals: Word[] = [];
  loading = true;

  ngOnInit() {
    this.api.getAnimals(200).subscribe({
      next: (data) => {
        this.animals = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching animals', err);
        this.loading = false;
      }
    });
  }
}
