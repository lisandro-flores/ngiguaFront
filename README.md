# Tha — Diccionario Digital Ngigua

> **Preservando la lengua Ngigua a través de tecnología web moderna.**

![Status](https://img.shields.io/badge/Status-Active-success)
![Angular](https://img.shields.io/badge/Angular-19-dd0031?logo=angular)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-CC_BY_NC_SA_4.0-lightgrey)

**Tha** ("Voz" en Ngigua) es una plataforma progresiva (PWA) diseñada para documentar, preservar y revitalizar la lengua Ngigua de San Marcos Tlacoyalco, Puebla. Este proyecto combina rigor lingüístico con una experiencia de usuario accesible y performante.

## 🚀 Características Principales

### Para la Comunidad
*   **Diccionario Vivo**: Búsqueda inteligente de vocablos, definiciones y ejemplos de uso.
*   **Estudio de Grabación**: Herramienta integrada para capturar pronunciaciones nativas directamente desde el navegador.
*   **Modo Offline (PWA)**: Funcionalidad completa incluso sin conexión a internet, crucial para zonas rurales.
*   **Temas**: Soporte nativo para modo claro y oscuro.

### Arquitectura Técnica
Este proyecto demuestra el uso de las últimas características de **Angular 19**:
*   **Signals**: Gestión de estado reactiva y granular para un rendimiento óptimo.
*   **Standalone Components**: Arquitectura modular sin NgModules.
*   **SSR / Hydration**: Renderizado híbrido para mejorar el SEO y el First Contentful Paint.
*   **Optimized Build**: Configuración avanzada de esbuild para bundles mínimos.

## 🛠️ Stack Tecnológico

**Frontend:**
*   **Framework**: Angular 19
*   **Estilos**: TailwindCSS (Utility-first architecture)
*   **Iconos**: SVG optimizados inline

**Backend (API):**
*   **Framework**: NestJS
*   **Base de Datos**: MongoDB (NoSQL para flexibilidad de esquemas lingüísticos)

## 📦 Instalación y Desarrollo

Para ejecutar este proyecto localmente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/lisandro-flores/ngigua-app.git

# 2. Instalar dependencias
cd ngigua-frontend
npm install

# 3. Iniciar servidor de desarrollo
ng serve
```

Visita `http://localhost:4200` en tu navegador.

## 🤝 Contribución y Licencia

Este proyecto es una iniciativa de código abierto bajo la licencia **CC BY-NC-SA 4.0**.
Las contribuciones culturales son revisadas por hablantes nativos de la comunidad.

---

### Desarrollado por
**Lisandro Flores** — *Full Stack Developer*
[GitHub](https://github.com/lisandro-flores) | [Email](mailto:contact@lisandro.dev)

> *Tecnología con propósito social.*
