# Generador de Exámenes

Proyecto final universitario desarrollado con **Next.js**, **Prisma**, **SQLite** y un diseño Vainilla CSS "Premium".
Cumple con todas las especificaciones de generación de preguntas, CRUD y sistema de puntajes.

## Estructura

- `/examenes` - Código fuente de la aplicación Next.js.
- `/propuesta` - Documentación inicial solicitada (esquemas de BD y sketches descritos).

## Requisitos

- Node.js 18+
- npm

## Instalación y Ejecución Local

1. Navegar al directorio del proyecto:
   ```bash
   cd examenes
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de base de datos y desarrollo en vivo:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run dev
   ```
4. Abrir [http://localhost:3000](http://localhost:3000)

## Pruebas
   npx prisma 

El sistema incluye pruebas Unitarias y End-to-End con grabación de video:

- **Pruebas Unitarias (Jest)**: 
  ```bash
  npm run test
  ```
- **Pruebas End-to-End Visuales (Playwright)**:
  ```bash
  npx playwright install --with-deps
  npm run test:e2e
  ```
  *(El video se generará en la carpeta `test-results/` tras la ejecución).*
