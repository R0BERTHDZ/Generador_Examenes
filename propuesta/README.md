# Propuesta: Generador de Exámenes

El Generador de Exámenes es una aplicación web full-stack creada con Next.js y SQLite que permite consumir miles de preguntas de trivia (vía OpenTDB) para practicar conocimientos generales. Los usuarios pueden registrarse, generar cuestionarios, responderlos y guardar su puntaje.

## Entregables de Propuesta

### Modelo de Base de Datos
El sistema utiliza una base de datos relacional (SQLite) a través del ORM Prisma. El modelo incluye 3 entidades principales:

1. **User (Usuario)**
   * `id`: String (UUID)
   * `email`: String (Único)
   * `name`: String (Opcional)
   * `password`: String (Hash completo)
   * `role`: String (admin | student)
   * `scores`: Relación a la tabla `Score`
   * `createdAt` / `updatedAt`: Tiempos de sistema

2. **Question (Preguntas)**
   * `id`: String (UUID)
   * `category`: String (Categoría del conocimiento)
   * `type`: String (Ej: múltiple o verdadero/falso)
   * `difficulty`: String (Fácil, Medio, Difícil)
   * `questionText`: String (El texto de la pregunta)
   * `correctAnswer`: String (La respuesta correcta textual)
   * `incorrectAnswers`: String (Un JSON array serializado de respuestas incorrectas)

3. **Score (Puntaje)**
   * `id`: String (UUID)
   * `points`: Int (Puntos obtenidos en el examen)
   * `total`: Int (Preguntas totales)
   * `userId`: String (Relacionado a `User.id`)
   * Relación `User`
   * `createdAt`: Tiempo de creación del puntaje

### Interfaz UI (Sketches / Pantallas)
El proyecto implementará un sistema visual moderno:
- **Login:** Autenticación limpia, enfocada en la tipografía y el espaciado.
- **Dashboard de Usuario:** Una tabla general con el puntaje de todos los exámenes pasados.
- **Generador de Exámenes:** Un formulario para escoger categoría (Historia, Ciencia, Tecnología) y dificultad, que conecta a la API.
- **Entorno de Examen:** Una pantalla inmersiva, una pregunta a la vez o listado completo, respondiendo mediante inputs de tipo *radio*. Al final se entrega la calificación y se persiste en BBDD.

(Las capturas reales se mostrarán en el video).
