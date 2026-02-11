import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

interface AdminUser {
  _id: string;
  username: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 font-sans transition-colors duration-300">
      <nav class="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
          <a routerLink="/" class="flex items-center gap-2 text-slate-900 dark:text-white font-serif font-bold text-xl">
            <span class="text-ngigua-500">🛡️</span> Admin Tha
          </a>
          <a routerLink="/" class="text-sm text-slate-400 hover:text-ngigua-500">Salir</a>
        </div>
      </nav>

      <div class="container mx-auto px-4 pt-12 max-w-4xl">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Gestión de usuarios</h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm">Solo administradores autorizados.</p>
        </header>

        <div *ngIf="loading" class="animate-pulse">
          <div class="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4"></div>
          <div class="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4"></div>
          <div class="h-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>

        <div *ngIf="error" class="text-red-500 text-sm mb-4" role="alert">{{ error }}</div>

        <div class="bg-white dark:bg-slate-800 rounded-none border border-slate-200 dark:border-slate-700 overflow-hidden" *ngIf="!loading">
          <table class="w-full text-sm">
            <thead class="bg-slate-50 dark:bg-slate-900 text-slate-500">
              <tr>
                <th class="text-left px-4 py-3">Usuario</th>
                <th class="text-left px-4 py-3">Rol</th>
                <th class="text-right px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users" class="border-t border-slate-100 dark:border-slate-700">
                <td class="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{{ user.username }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="user.role === 'admin' ? 'bg-ngigua-100 text-ngigua-700 dark:bg-ngigua-900/40 dark:text-ngigua-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <button type="button" (click)="toggleRole(user)" [disabled]="savingId === user._id"
                    class="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-600 hover:border-ngigua-400 hover:text-ngigua-600 transition-colors">
                    Cambiar rol
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AdminComponent implements OnInit {
  private api = inject(ApiService);
  users: AdminUser[] = [];
  loading = true;
  error = '';
  savingId: string | null = null;

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.error = '';
    this.api.listUsers().subscribe({
      next: (users) => {
        this.users = users as AdminUser[];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de usuarios.';
        this.loading = false;
      }
    });
  }

  toggleRole(user: AdminUser) {
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    this.savingId = user._id;
    this.api.updateUserRole(user._id, nextRole).subscribe({
      next: (updated) => {
        user.role = updated.role;
        this.savingId = null;
      },
      error: () => {
        this.error = 'No se pudo actualizar el rol.';
        this.savingId = null;
      }
    });
  }
}
