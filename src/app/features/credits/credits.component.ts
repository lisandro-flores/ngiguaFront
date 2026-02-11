import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-20">
      <nav class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
           <a routerLink="/" class="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-xl">
             <span class="text-ngigua-500">←</span> Tha — Diccionario Ngigua
          </a>
        </div>
      </nav>

      <div class="container mx-auto px-4 pt-12 max-w-3xl">
        <header class="mb-10 text-center">
            <h1 class="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Créditos y Licencia
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-lg">
              Comprometidos con la difusión ética y legal de la cultura.
            </p>
        </header>

        <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
            <div class="flex flex-col md:flex-row items-center gap-6 mb-6">
                <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" class="h-12 w-12" alt="CC">
                <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" class="h-12 w-12" alt="BY">
                <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" class="h-12 w-12" alt="NC">
                <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" class="h-12 w-12" alt="SA">
            </div>
            
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Licencia Creative Commons</h2>
            <p class="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                Esta obra y aplicación están derivadas del <strong class="text-ngigua-600 dark:text-ngigua-400">"VOCABULARIO DICCIONARIO NGIGUA - ESPAÑOL"</strong> 
                y se distribuyen bajo la licencia 
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" class="font-bold underline decoration-ngigua-400 decoration-2 hover:text-ngigua-600">
                    Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)
                </a>.
            </p>

            <div class="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 text-sm text-slate-600 dark:text-slate-400 space-y-2 border-l-4 border-ngigua-500">
                <p><strong>Usted es libre de:</strong></p>
                <ul class="list-disc pl-5 space-y-1 mb-4">
                    <li><strong>Compartir</strong> — copiar y redistribuir el material en cualquier medio o formato.</li>
                    <li><strong>Adaptar</strong> — remezclar, transformar y crear a partir del material.</li>
                </ul>
                <p><strong>Bajo las siguientes condiciones:</strong></p>
                <ul class="list-disc pl-5 space-y-1">
                    <li><strong>Atribución</strong>: Debe dar crédito de manera adecuada.</li>
                    <li><strong>No Comercial</strong>: No puede hacer uso del material con fines comerciales.</li>
                    <li><strong>Compartir Igual</strong>: Si remezcla, transforma o crea a partir del material, debe distribuir su contribución bajo la misma licencia del original.</li>
                </ul>
            </div>
        </section>

        <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Fuente Original</h2>
            <p class="text-slate-700 dark:text-slate-300 mb-2">
                <strong>Vocabulario Diccionario Ngigua - Español</strong>
            </p>
            <p class="text-slate-600 dark:text-slate-400 text-sm">
                San Marcos Tlacoyalco, Puebla.
            </p>
        </section>
      </div>
    </div>
  `,
  styles: []
})
export class CreditsComponent { }
