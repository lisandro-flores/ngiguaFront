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

        <section class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 mb-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-ngigua-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span>💻</span> Desarrollo y Diseño
            </h2>

            <div class="flex flex-col md:flex-row gap-8 items-start">
                <!-- Avatar / Visual -->
                <div class="shrink-0 relative">
                    <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-ngigua-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-ngigua-500/20">
                        L
                    </div>
                </div>

                <!-- Info -->
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white">Lisandro</h3>
                    <p class="text-ngigua-600 dark:text-ngigua-400 font-medium mb-3">Full Stack Developer</p>
                    
                    <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Apasionado por crear tecnología que preserva la cultura. Especializado en aplicaciones web modernas, rápidas y accesibles.
                        <br>
                        <span class="text-sm italic opacity-80 mt-2 block">Available for freelance projects.</span>
                    </p>

                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-600">Angular 19</span>
                        <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-600">TailwindCSS</span>
                        <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-600">TypeScript</span>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-4">
                        <a href="https://github.com/lisandro-flores" target="_blank" rel="noopener noreferrer" 
                           class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition-opacity">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                            GitHub
                        </a>
                        <a href="mailto:contact@lisandro.dev" 
                           class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600">
                            📧 Contactar
                        </a>
                    </div>
                </div>
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
