# 🎓 NextExam Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Blue) ![Prisma](https://img.shields.io/badge/Prisma-ORM-green) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)

Una plataforma en la cual los usuarios podran realizar examenes para mejorar sus habilidades.

## 🚀 Características Principales

### Para Usuarios (Estudiantes/Candidatos)
- **Autenticación Segura:** Registro e inicio de sesión (Email/Password).
- **Sala de Examen Interactiva:** Interfaz limpia y sin distracciones para realizar pruebas.
- **Feedback Inmediato:** Calificación automática al finalizar el examen.
- **Historial Detallado:** Panel de control (Dashboard) para ver exámenes pasados, puntajes y progreso a lo largo del tiempo.

## 🛠 Tech Stack

El proyecto está construido utilizando la arquitectura Full-Stack de Next.js:

- **Frontend:** Next.js (App Router), React, Tailwind CSS.
- **UI Components:** shadcn/ui (Radix UI).
- **Backend:** Next.js Server Actions & API Routes.
- **Base de Datos:** PostgreSQL.
- **ORM:** Prisma.
- **Autenticación:** NextAuth.js 

## 🗄️ Esquema de Base de Datos 

La estructura relacional principal se basa en:

- `User`: Datos del usuario y credenciales.
- `Exam`: Metadatos del examen (título, tiempo límite, descripción).
- `Question`: Preguntas asociadas a un examen.
- `Option`: Opciones de respuesta para cada pregunta.
- `Attempt`: Registro de un usuario tomando un examen (puntaje final, fecha).
- `UserAnswer`: Respuestas específicas elegidas por el usuario en un intento.


