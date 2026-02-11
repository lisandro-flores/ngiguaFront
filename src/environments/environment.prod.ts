// This file will be replaced during the build process with the actual API URL
// See Dockerfile for how BACKEND_URL is injected at build time
export const environment = {
    production: true,
    apiUrl: (typeof window !== 'undefined' ? (window as any).__env?.apiUrl : undefined) || 'https://api.ngigua.com' // fallback URL
};
