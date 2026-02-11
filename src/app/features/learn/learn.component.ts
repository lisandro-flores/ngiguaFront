import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, Word } from '../../core/services/api.service';

interface QuizState {
  question: any;
  options: any[];
}

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-indigo-50 dark:bg-slate-900 pb-20 font-sans transition-colors duration-300">
      <nav class="bg-white dark:bg-slate-950 border-b border-indigo-100 dark:border-slate-800 sticky top-0 z-30">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
           <a routerLink="/" class="flex items-center gap-2 font-serif font-bold text-xl text-slate-900 dark:text-white">
             <span class="text-indigo-500 text-2xl">🎓</span> Escuela Tha
          </a>
          <a routerLink="/" class="text-sm text-slate-400 hover:text-indigo-500">Salir</a>
        </div>
      </nav>

      <div class="container mx-auto px-4 pt-12 max-w-2xl">
        
        @if (loading) {
            <div class="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
                <div class="w-16 h-16 bg-indigo-200 dark:bg-slate-700 rounded-full mb-4"></div>
                <div class="h-4 bg-indigo-200 dark:bg-slate-700 w-48 rounded"></div>
            </div>
        } @else if (quiz) {
            <div class="fade-in">
                <!-- Progress/Header -->
                <div class="flex items-center justify-between mb-8">
                    <span class="text-sm font-bold uppercase tracking-widest text-indigo-400">Quiz Rápido</span>
                    <span class="bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold">
                        Puntos: {{ score }}
                    </span>
                </div>

                <!-- Question Card -->
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-indigo-100/50 dark:shadow-none mb-8 text-center relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                    
                    <p class="text-slate-400 uppercase text-xs font-bold mb-4">¿Qué significa esta definición?</p>
                    
                    <h2 class="text-2xl md:text-3xl font-serif font-medium text-slate-800 dark:text-slate-100 mb-6 leading-relaxed">
                        "{{ quiz.question.definition }}"
                    </h2>

                    @if (result) {
                        <div class="absolute inset-0 bg-white/90 dark:bg-slate-800/95 flex flex-col items-center justify-center z-10 backdrop-blur-sm animate-fade-in">
                            @if (result === 'correct') {
                                <div class="text-6xl mb-4">🎉</div>
                                <h3 class="text-2xl font-bold text-green-500 mb-2">¡Correcto!</h3>
                                <p class="text-slate-600 dark:text-slate-300 text-lg mb-6">
                                    <span class="font-bold">{{ quiz.question.term }}</span> es la respuesta.
                                </p>
                            } @else {
                                <div class="text-6xl mb-4">😢</div>
                                <h3 class="text-2xl font-bold text-red-500 mb-2">Incorrecto</h3>
                                <p class="text-slate-600 dark:text-slate-300 text-lg mb-6">
                                    La respuesta era <span class="font-bold">{{ quiz.question.term }}</span>.
                                </p>
                            }
                            <button type="button" (click)="loadQuiz()" 
                                class="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-transform hover:scale-105 shadow-lg shadow-indigo-500/30">
                                Siguiente Pregunta ➜
                            </button>
                        </div>
                    }
                </div>

                <!-- Options Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (opt of quiz.options; track (opt && opt._id) || $index) {
                        @if (opt) {
                        <button type="button" (click)="checkAnswer(opt)" [disabled]="!!result"
                          class="p-6 rounded-none border-2 border-transparent bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all text-lg font-bold text-slate-700 dark:text-slate-200 group text-left relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                            <span class="relative z-10">{{ opt.term }}</span>
                            <div class="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                        }
                    }
                </div>
            </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class LearnComponent implements OnInit {
  private api = inject(ApiService);

  quiz: QuizState | null = null;
  loading = true;
  result: 'correct' | 'incorrect' | null = null;
  score = 0;

  ngOnInit() {
    this.loadQuiz();
  }

  loadQuiz() {
    this.loading = true;
    this.result = null;
    this.api.getQuiz().subscribe({
      next: (data) => {
        // Defensive filtering in case API returns nulls
        if (data && data.options && Array.isArray(data.options)) {
          const nullCount = data.options.filter(o => !o).length;
          if (nullCount > 0) console.warn(`LearnComponent.loadQuiz: filtered ${nullCount} null options`);
          data.options = data.options.filter(Boolean);
        }
        this.quiz = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  checkAnswer(option: any) {
    if (this.result) return;

    if (option._id === this.quiz?.question._id) {
      this.result = 'correct';
      this.score += 10;
      this.playSuccessSound();
    } else {
      this.result = 'incorrect';
      this.score = Math.max(0, this.score - 5); // Penalty
      this.playErrorSound();
    }
  }

  playSuccessSound() {
    // Simple beep logic or silent for now
  }

  playErrorSound() {
    // Simple error sound logic
  }
}
