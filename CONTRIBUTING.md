# Contribuir a Ngigua Dictionary

¡Gracias por tu interés en contribuir al Diccionario Ngigua! Este es un proyecto de preservación cultural y cualquier ayuda es bienvenida.

## 🌟 Formas de Contribuir

- Reportar bugs o problemas
- Sugerir nuevas funcionalidades
- Mejorar la documentación
- Mejorar la UI/UX
- Agregar tests
- Optimizar performance

## 🐛 Reportar Bugs

1. Verifica que el bug no haya sido reportado antes
2. Abre un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del navegador/sistema

## 💡 Sugerir Funcionalidades

1. Abre un issue con etiqueta "enhancement"
2. Describe la funcionalidad y su propósito
3. Explica casos de uso
4. Incluye mockups si es posible

## 🔧 Proceso de Desarrollo

### Setup Local

```bash
git clone https://github.com/lisandro-flores/ngiguaFront.git
cd ngiguaFront
npm install
npm start
# Navega a http://localhost:4200
```

### Branching Strategy

- `main` - Código en producción
- `develop` - Desarrollo activo
- `feature/nombre` - Nuevas funcionalidades
- `fix/nombre` - Correcciones de bugs

### Pull Request Process

1. Fork el repositorio
2. Crea una rama desde `develop`
3. Realiza tus cambios
4. Agrega tests si aplica
5. Asegúrate de que pasen todos los tests
6. Actualiza documentación si es necesario
7. Crea un PR hacia `develop`

### Estándares de Código

#### Angular/TypeScript
- Seguir Angular style guide oficial
- Usar OnPush change detection
- Reactive forms
- RxJS para async operations
- Standalone components preferidos (Angular 19)

```typescript
// ✅ Bueno
@Component({
  selector: 'app-word-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class WordCardComponent {
  @Input() word!: Word;
  @Output() wordSelected = new EventEmitter<Word>();
}

// ❌ Malo
@Component({
  selector: 'app-word-card',
})
export class WordCardComponent {
  word: any;
  onSelect() {
    // lógica compleja aquí
  }
}
```

#### CSS/Tailwind
- Usar Tailwind utility classes
- Dark mode support
- Responsive design (mobile-first)
- Evitar CSS custom cuando sea posible

```html
<!-- ✅ Bueno -->
<div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-900 dark:text-white">
    {{ word.ngigua }}
  </h2>
</div>

<!-- ❌ Malo -->
<div style="padding: 1rem; background: white;">
  <h2>{{ word.ngigua }}</h2>
</div>
```

### Commits

Usar commits semánticos:

```
feat: agregar modo oscuro
fix: corregir scroll en iOS Safari
docs: actualizar README
style: aplicar formato prettier
refactor: simplificar componente de búsqueda
test: agregar tests para api service
chore: actualizar Angular a v19
perf: optimizar lazy loading
```

### Tests

```bash
npm test                    # Unit tests
npm test -- --watch=false   # Single run
npm test -- --code-coverage # Con coverage
```

### Performance

- Lighthouse score > 90 en todas las métricas
- Lazy load de rutas
- Optimizar imágenes (webp)
- Minimizar bundle size
- Usar trackBy en *ngFor

## 🎨 UI/UX Guidelines

- Diseño minimalista y limpio
- Accesibilidad (WCAG 2.1 AA)
- Soporte para dark mode
- Responsive (mobile, tablet, desktop)
- Animaciones sutiles
- Feedback visual para acciones

## 📱 PWA

Mantener compatibilidad PWA:
- Service worker actualizado
- Manifest completo
- Iconos correctos (192x192, 512x512)
- Offline fallback

## 📝 Documentación

- Actualiza README.md si cambias funcionalidad
- Comenta componentes complejos
- Documenta props de componentes
- Actualiza DEPLOYMENT.md si cambias build

## 🔒 Seguridad

Si encuentras una vulnerabilidad:

- **NO** abras un issue público
- Envía un email a: [tu-email@domain.com]
- Incluye descripción detallada

## 📜 Código de Conducta

- Sé respetuoso y profesional
- Acepta crítica constructiva
- Enfócate en el problema, no en la persona
- Valora la diversidad
- Cero tolerancia al acoso

## ❓ Preguntas

Si tienes dudas:
- Abre un issue con etiqueta "question"
- Revisa issues existentes
- Lee la documentación

## 🎉 Reconocimientos

Todos los contribuidores serán listados en el README.

¡Gracias por ayudar a preservar la lengua Ngigua! 🙏
