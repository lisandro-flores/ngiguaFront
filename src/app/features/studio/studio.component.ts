import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Word } from '../../core/services/api.service';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-900 text-white pb-20 font-sans">
      <nav class="border-b border-slate-800 sticky top-0 bg-slate-900/90 backdrop-blur z-30">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
           <a routerLink="/" class="flex items-center gap-2 font-serif font-bold text-xl">
             <span class="text-red-500">●</span> Estudio Tha
          </a>
          <a routerLink="/" class="text-sm text-slate-400 hover:text-white">Salir</a>
        </div>
      </nav>

      <div class="container mx-auto px-4 pt-12 max-w-2xl">
        <!-- Step 1: Select Word -->
        <section class="mb-12">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
                <span class="bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Selecciona una palabra
            </h2>
            <div class="relative">
                <input type="text" [(ngModel)]="query" (keyup.enter)="search()"
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-lg focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder:text-slate-600"
                    placeholder="Busca la palabra a grabar (ej. dajon)...">
                <button type="button" (click)="search()" class="absolute right-3 top-3 bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
                    🔍
                </button>
            </div>

            @if (results.length > 0) {
                <div class="mt-4 grid gap-2">
                    @for (w of results; track (w && w._id) || $index) {
                        @if (w) {
                        <button type="button" (click)="selectWord(w)" 
                            class="text-left px-5 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all flex justify-between items-center group"
                            [class.ring-2]="selectedWord?._id === w._id"
                            [class.ring-red-500]="selectedWord?._id === w._id"
                            [class.bg-slate-800]="selectedWord?._id === w._id">
                            <div>
                                <span class="font-serif font-bold text-lg">{{ w.term }}</span>
                                <span class="text-xs text-slate-500 ml-2 uppercase">{{ w.type }}</span>
                            </div>
                            @if (w.audioUrl) {
                                <span class="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">Ya tiene audio</span>
                            }
                        </button>
                        }
                    }
                </div>
            }
        </section>

        <!-- Step 2: Record -->
        @if (selectedWord) {
            <section class="fade-in">
                <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span class="bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                    Graba tu voz
                </h2>
                
                <div class="bg-slate-800 rounded-none p-8 border border-slate-700 text-center relative overflow-hidden">
                    <div class="mb-8">
                        <p class="text-slate-400 text-sm uppercase tracking-widest mb-2">Palabra</p>
                        <h3 class="text-5xl font-serif font-bold mb-2">{{ selectedWord.term }}</h3>
                        @if (selectedWord?.definitions?.length) {
                            <p class="text-slate-400 italic">"{{ selectedWord?.definitions?.[0] }}"</p>
                        }
                    </div>

                    <div class="flex flex-col items-center gap-6 justify-center">
                        @if (!isRecording && !audioBlob) {
                            <button type="button" (click)="startRecording()" 
                                class="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/50 flex items-center justify-center transition-all hover:scale-105 group">
                                <span class="w-8 h-8 bg-white rounded-full transition-transform group-hover:scale-90"></span>
                            </button>
                            <p class="text-sm text-slate-400">Presiona para grabar</p>
                        }

                        @if (isRecording) {
                            <div class="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center animate-pulse relative">
                                <button type="button" (click)="stopRecording()" class="w-8 h-8 bg-red-500 rounded-sm"></button>
                            </div>
                            <p class="text-sm text-red-400 font-mono animate-pulse">GRABANDO...</p>
                        }

                        @if (audioBlob && !isRecording) {
                             <div class="flex gap-4">
                                <button type="button" (click)="playPreview()" class="px-6 py-2 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
                                    ▶ Escuchar
                                </button>
                                <button type="button" (click)="clearRecording()" class="px-6 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
                                    🗑️ Borrar
                                </button>
                             </div>

                               <button type="button" (click)="upload()" [disabled]="uploading"
                                class="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-lg hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                @if (uploading) {
                                    Subiendo...
                                } @else {
                                    💾 Guardar Grabación
                                }
                             </button>
                        }
                    </div>
                </div>
            </section>
        }
      </div>
    </div>
  `,
  styles: []
})
export class StudioComponent {
  private api = inject(ApiService);

  query = '';
  results: Word[] = [];
  selectedWord?: Word;

  // Recording logic
  mediaRecorder?: MediaRecorder;
  audioChunks: Blob[] = [];
  audioBlob?: Blob;
  audioUrlPreview?: string;
  isRecording = false;
  uploading = false;

  search() {
    if (!this.query.trim()) return;
    this.api.search(this.query).subscribe(res => {
      const filtered = Array.isArray(res) ? res.filter(Boolean) as Word[] : [];
      const nullCount = Array.isArray(res) ? res.filter(v => !v).length : 0;
      if (nullCount > 0) console.warn(`StudioComponent.search: filtered ${nullCount} null/undefined results`);
      this.results = filtered;
    });
  }

  selectWord(w: Word) {
    this.selectedWord = w;
    this.clearRecording();
  }

  async startRecording() {
    this.audioChunks = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' }); // Use webm for simplicity in Chrome/Firefox
        this.audioUrlPreview = URL.createObjectURL(this.audioBlob);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('No se pudo acceder al micrófono. Por favor permite el acceso.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop stream
    }
  }

  playPreview() {
    if (this.audioUrlPreview) {
      const audio = new Audio(this.audioUrlPreview);
      audio.play();
    }
  }

  clearRecording() {
    this.audioBlob = undefined;
    this.audioChunks = [];
    this.isRecording = false;
  }

  upload() {
    if (!this.audioBlob || !this.selectedWord) return;
    this.uploading = true;

    // Rename file to mp3 or webm depending on MIME.
    const ext = this.audioBlob.type.includes('mp3') ? 'mp3' : 'webm';
    const file = new File([this.audioBlob], `recording.${ext}`, { type: this.audioBlob.type });

    this.api.uploadAudio(this.selectedWord._id, file).subscribe({
      next: (res) => {
        if (this.selectedWord) {
          this.selectedWord.audioUrl = res.audioUrl;
        }
        this.uploading = false;
        alert('¡Audio guardado correctamente!');
      },
      error: (err) => {
        console.error(err);
        this.uploading = false;
        alert('Error al subir');
      }
    });
  }
}
