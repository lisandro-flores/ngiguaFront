import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-docs.component.html',
  styles: [`
    pre {
      background-color: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
    }
    .endpoint-badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: uppercase;
    }
    .get-badge {
      background-color: #dbeafe;
      color: #1e40af;
    }
  `]
})
export class ApiDocsComponent {
  baseUrl = environment.apiUrl;

  endpoints = [
    {
      method: 'GET',
      path: '/words/search',
      description: 'Buscar palabras por término o definición.',
      params: [
        { name: 'q', type: 'string', required: true, description: 'Término a buscar (ej. "dajon")' },
        { name: 'mode', type: 'string', required: false, description: 'Modo de búsqueda: "precise" o "suggestions" (default)' }
      ],
      exampleRequest: '/words/search?q=dajon',
      exampleResponse: `[
  {
    "_id": "60d5ec...",
    "term": "dajon",
    "type": "verbo",
    "definitions": ["barrer"],
    "conjugations": [],
    "examples": []
  }
]`
    },
    {
      method: 'GET',
      path: '/words/random',
      description: 'Obtener una palabra aleatoria.',
      params: [],
      exampleRequest: '/words/random',
      exampleResponse: `{
  "_id": "60d5ec...",
  "term": "chjiekja",
  "type": "sustantivo",
  "definitions": ["hormiga"],
  ...
}`
    },
    {
      method: 'GET',
      path: '/words/:id',
      description: 'Obtener detalles de una palabra específica por ID.',
      params: [
        { name: 'id', type: 'string', required: true, description: 'ID único de la palabra' }
      ],
      exampleRequest: '/words/60d5ec...',
      exampleResponse: `{ ... }`
    }
  ];

  constructor() {
    // BaseUrl is now set from environment
  }
}
