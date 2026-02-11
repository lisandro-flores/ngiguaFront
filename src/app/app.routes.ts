import { Routes } from '@angular/router';
import { ApiDocsComponent } from './features/api-docs/api-docs.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'api', component: ApiDocsComponent },
    { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent) },
    { path: 'animals', loadComponent: () => import('./features/fauna/fauna.component').then(m => m.FaunaComponent) },
    { path: 'credits', loadComponent: () => import('./features/credits/credits.component').then(m => m.CreditsComponent) },
    { path: 'studio', loadComponent: () => import('./features/studio/studio.component').then(m => m.StudioComponent) },
    { path: 'learn', loadComponent: () => import('./features/learn/learn.component').then(m => m.LearnComponent) },
    { path: 'community', loadComponent: () => import('./features/community/community.component').then(m => m.CommunityComponent) }
];
