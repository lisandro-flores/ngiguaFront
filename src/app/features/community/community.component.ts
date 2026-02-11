import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-emerald-50 dark:bg-slate-900 pb-20 font-sans transition-colors duration-300">
      <nav class="bg-white dark:bg-slate-950 border-b border-emerald-100 dark:border-slate-800 sticky top-0 z-30">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
           <a routerLink="/" class="flex items-center gap-2 font-serif font-bold text-xl text-slate-900 dark:text-white">
             <span class="text-emerald-500">🌱</span> Comunidad Tha
          </a>
          <a routerLink="/" class="text-sm text-slate-400 hover:text-emerald-500">Salir</a>
        </div>
      </nav>

      <div class="container mx-auto px-4 pt-12 max-w-md">
        
        @if (!token) {
        <section class="mt-10 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-emerald-100 dark:border-slate-700">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">Recursos comunitarios</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Tha se construye con aportes colectivos. Aquí tienes una guía breve para participar con calidad y respeto.
          </p>

          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-semibold text-emerald-600">Guía de contribución</h4>
              <ul class="text-xs text-slate-500 dark:text-slate-400 list-disc pl-5 mt-1 space-y-1">
                <li>Busca la palabra y confirma con tu comunidad.</li>
                <li>Agrega definición breve y ejemplo real.</li>
                <li>Si puedes, graba audio claro.</li>
              </ul>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-emerald-600">Código de conducta</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                Respeto, colaboración y cuidado cultural en cada aporte.
              </p>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-emerald-600">Checklist de publicación</h4>
              <ul class="text-xs text-slate-500 dark:text-slate-400 list-disc pl-5 mt-1 space-y-1">
                <li>Definiciones claras y verificadas.</li>
                <li>Audios limpios en palabras clave.</li>
                <li>Créditos y licencia visibles.</li>
              </ul>
            </div>
          </div>
        </section>
            <!-- Auth Forms -->
            <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-emerald-100/50 dark:shadow-none fade-in">
                <div class="flex gap-4 mb-8 border-b border-slate-100 dark:border-slate-700 pb-4" role="tablist" aria-label="Opciones de acceso">
                  <button type="button" (click)="view = 'login'" 
                        [class.text-emerald-600]="view === 'login'"
                        [class.font-bold]="view === 'login'"
                    class="flex-1 text-center pb-2 text-slate-500 hover:text-emerald-500 transition-colors"
                    role="tab" [attr.aria-selected]="view === 'login'">
                        Iniciar Sesión
                    </button>
                  <button type="button" (click)="view = 'register'" 
                        [class.text-emerald-600]="view === 'register'"
                        [class.font-bold]="view === 'register'"
                    class="flex-1 text-center pb-2 text-slate-500 hover:text-emerald-500 transition-colors"
                    role="tab" [attr.aria-selected]="view === 'register'">
                        Registrarse
                    </button>
                </div>

                <form (ngSubmit)="onSubmit()" aria-busy="loading">
                    <div class="mb-4">
                      <label for="community-username" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Usuario</label>
                      <input id="community-username" type="text" [(ngModel)]="username" name="username" autocomplete="username" minlength="3" required
                      class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                    </div>
                    <div class="mb-6">
                      <label for="community-password" class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Contraseña</label>
                      <input id="community-password" type="password" [(ngModel)]="password" name="password" autocomplete="current-password" minlength="6" required
                      class="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
                    </div>
                    
                  @if (error) {
                    <p class="text-red-500 text-sm mb-4 text-center" role="alert">{{ error }}</p>
                  }

                  @if (success) {
                    <p class="text-emerald-500 text-sm mb-4 text-center" role="status">{{ success }}</p>
                    }

                    <button type="submit" [disabled]="loading"
                        class="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50">
                        {{ view === 'login' ? 'Entrar' : 'Crear Cuenta' }}
                    </button>
                </form>
            </div>
        } @else {
            <!-- Dashboard -->
            <div class="fade-in">
                <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-emerald-100/50 dark:shadow-none text-center">
                    <div class="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        👤
                    </div>
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">¡Hola, {{ username }}!</h2>
                    <p class="text-slate-500 mb-6">Gracias por contribuir a preservar el Ngigua en Tha.</p>

                    <button class="w-full py-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-200 font-bold mb-3 flex items-center justify-center gap-2 transition-colors">
                        <span>📝</span> Sugerir Nueva Palabra
                    </button>
                    <button class="w-full py-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-700 dark:text-slate-200 font-bold mb-6 flex items-center justify-center gap-2 transition-colors">
                        <span>✏️</span> Corregir Definición
                    </button>

                    <button (click)="logout()" class="text-red-400 hover:text-red-500 text-sm font-bold">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        }

      </div>
    </div>
  `,
  styles: []
})
export class CommunityComponent {
  private api = inject(ApiService);

  view: 'login' | 'register' = 'login';
  username = '';
  password = '';
  loading = false;
  error = '';
  success = '';
  token = '';

  ngOnInit() {
    const stored = this.api.getToken();
    if (stored) this.token = stored;
  }

  onSubmit() {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.error = '';
    this.success = '';

    if (this.view === 'login') {
      this.api.login(this.username, this.password).subscribe({
        next: (res) => {
          this.token = res.access_token;
          this.api.setToken(res.access_token);
          this.loading = false;
        },
        error: () => {
          this.error = 'Credenciales inválidas';
          this.loading = false;
        }
      });
    } else {
      this.api.register(this.username, this.password).subscribe({
        next: () => {
          this.view = 'login'; // Switch to login after register
          this.success = '¡Cuenta creada! Por favor inicia sesión.';
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al registrar. El usuario quizás ya existe.';
          this.loading = false;
        }
      });
    }
  }

  logout() {
    this.token = '';
    this.username = '';
    this.password = '';
    this.api.clearToken();
    this.view = 'login';
  }
}
