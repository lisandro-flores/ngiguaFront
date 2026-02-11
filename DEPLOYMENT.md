# Despliegue en Producción - Frontend

Esta guía detalla los pasos para desplegar el frontend de Ngigua Dictionary en producción.

## 🚀 Opciones de Despliegue

### Opción 1: Vercel (Recomendado - Gratis)

1. **Crear cuenta en Vercel**
   - Visita [Vercel](https://vercel.com)
   - Conecta con GitHub

2. **Importar proyecto**
   - Click en "Add New Project"
   - Selecciona tu repositorio `ngiguaFront`
   - Framework Preset: Angular

3. **Configurar Build**
   ```
   Build Command: npm run build
   Output Directory: dist/ngigua-frontend/browser
   Install Command: npm install
   ```

4. **Variables de entorno**
   
   En el dashboard de Vercel, agrega:
   ```
   BACKEND_URL=https://tu-backend-api.com
   ```

5. **Desplegar**
   - Click en "Deploy"
   - Tu sitio estará disponible en `https://tu-proyecto.vercel.app`

### Opción 2: Netlify (Gratis)

1. **Crear cuenta en Netlify**
   - Visita [Netlify](https://www.netlify.com)
   - Conecta con GitHub

2. **Nuevo sitio desde Git**
   - Selecciona `ngiguaFront`
   - Build command: `npm run build`
   - Publish directory: `dist/ngigua-frontend/browser`

3. **Variables de entorno**
   ```
   BACKEND_URL=https://tu-backend-api.com
   ```

4. **Configurar redirects** (importante para SPA)
   
   Crear `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Opción 3: DigitalOcean App Platform

1. **Crear App**
   - En DigitalOcean, crea nueva App
   - Conecta repositorio GitHub

2. **Configurar**
   ```
   Build Command: npm run build
   Build Args: BACKEND_URL=https://tu-backend.com
   Run Command: (déjalo vacío, usará nginx)
   ```

3. **Dockerfile**
   El proyecto ya incluye un Dockerfile optimizado con nginx

### Opción 4: Docker + nginx en VPS

1. **Build de producción con Docker**
   ```bash
   docker build \
     --build-arg BACKEND_URL=https://tu-backend-api.com \
     -t ngigua-frontend:latest .
   ```

2. **Ejecutar contenedor**
   ```bash
   docker run -d \
     -p 80:80 \
     -p 443:443 \
     --name ngigua-frontend \
     --restart unless-stopped \
     ngigua-frontend:latest
   ```

3. **Configurar HTTPS con Certbot**
   ```bash
   # En el servidor
   apt install certbot python3-certbot-nginx
   certbot --nginx -d tu-dominio.com
   ```

### Opción 5: GitHub Pages (Limitado - Solo estático)

**Nota**: No recomendado si usas SSR, pero funciona para SPA básica.

```bash
# Instalar gh-pages
npm install --save-dev angular-cli-ghpages

# Build y desplegar
npm run build -- --base-href=/ngiguaFront/
npx angular-cli-ghpages --dir=dist/ngigua-frontend/browser
```

## 🔧 Configuración Pre-Despliegue

### 1. Actualizar environment.prod.ts

Ya está configurado para recibir la URL del backend en build time.

### 2. Verificar nginx.conf

El archivo `nginx.conf` incluye:
- Gzip compression
- Security headers
- SPA routing fallback
- Cache optimization

### 3. PWA Configuration

Verifica `ngsw-config.json` para asegurar que los archivos correctos están en caché.

## 🔒 Checklist de Seguridad

- [ ] HTTPS habilitado (SSL/TLS)
- [ ] Security headers configurados (ya en nginx.conf)
- [ ] BACKEND_URL apunta al dominio correcto
- [ ] No hay API keys expuestas en el código
- [ ] Service Worker configurado correctamente
- [ ] CORS configurado en backend para tu dominio

## 📊 Optimización

### Lighthouse Score Target
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- PWA: ✓ Installable

### Optimizaciones incluidas
- ✅ Lazy loading de rutas
- ✅ AOT compilation
- ✅ Tree shaking
- ✅ Minificación
- ✅ Gzip compression
- ✅ Service Worker caching
- ✅ Image optimization (webp si aplica)

## 🌐 Configurar Dominio Personalizado

### Vercel/Netlify
1. Ve a Settings → Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

### VPS/DigitalOcean
```bash
# DNS A Record
Type: A
Name: @
Value: <tu-vps-ip>

# DNS CNAME (opcional para www)
Type: CNAME
Name: www
Value: tu-dominio.com
```

## 📱 Progressive Web App

### Verificar instalación
1. Abre tu sitio en Chrome/Edge
2. Busca el ícono de instalación en la barra de direcciones
3. Instala la app

### Manifest
Verifica que `manifest.webmanifest` tenga:
- name, short_name
- icons (192x192, 512x512)
- start_url
- display: standalone
- theme_color, background_color

## 🔄 Actualizar Producción

### Vercel/Netlify (Automático)
```bash
git push origin main
# Se despliega automáticamente
```

### Docker manual
```bash
# Rebuild
docker build --build-arg BACKEND_URL=https://api.ngigua.com -t ngigua-frontend:latest .

# Detener y reemplazar
docker stop ngigua-frontend
docker rm ngigua-frontend
docker run -d -p 80:80 --name ngigua-frontend ngigua-frontend:latest
```

## 🆘 Troubleshooting

### Error 404 en rutas
- Verifica que nginx.conf tenga `try_files $uri $uri/ /index.html;`
- En Netlify, verifica `netlify.toml`

### API calls fallan
- Verifica CORS en backend
- Confirma que BACKEND_URL sea correcta
- Revisa console de browser para errores

### Service Worker no funciona
- Debe ser servido sobre HTTPS
- Verifica `ngsw-config.json`
- Clear cache y recarga

### PWA no se puede instalar
- Verifica que manifest.webmanifest sea accesible
- Debe tener HTTPS
- Revisa que service worker esté registrado

## 💰 Costos Estimados

- **Vercel**: $0 (free tier) - $20/mes (Pro)
- **Netlify**: $0 (free tier) - $19/mes (Pro)
- **DigitalOcean**: $5-12/mes (App Platform)
- **VPS**: $5-10/mes

## 📈 Monitoreo y Analytics

### Google Analytics
```typescript
// Agrega en index.html o usa @angular/fire
```

### Sentry (Error tracking)
```bash
npm install @sentry/angular
```

### Uptime monitoring
- UptimeRobot (gratuito)
- Pingdom
- StatusCake

## 🎯 Próximos Pasos

1. Configurar CDN (Cloudflare) para mejor performance global
2. Implementar A/B testing
3. Agregar analytics avanzados
4. Configurar error tracking (Sentry)
5. Implementar feature flags
