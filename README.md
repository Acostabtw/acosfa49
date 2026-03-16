# Proyecto ACOSFA

Este es el repositorio del proyecto ACOSFA. Incluye el frontend (HTML/CSS) y el backend (Node.js con MySQL).

## Requisitos Previos

- [Node.js](https://nodejs.org/) instalado.
- [MySQL Workbench](https://www.mysql.com/products/workbench/) instalado y configurado localmente.

## Configuración y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd proyecto1
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la base de datos:**
   Sigue los pasos detallados en la [Guía de Base de Datos](DATABASE_GUIDE.md) para importar el archivo `.sql` en tu MySQL local.

4. **Variables de Entorno:**
   Copia el archivo `.env.example` a uno nuevo llamado `.env` y configura tus credenciales de MySQL:
   ```bash
   cp .env.example .env
   ```

5. **Iniciar el servidor:**
   ```bash
   npm start
   ```

## Estructura del Proyecto

- `server.js`: Servidor Express que maneja la lógica y conexión a DB.
- `DATABASE_GUIDE.md`: Instrucciones paso a paso para exportar/importar la DB.
- `sql/`: Carpeta (recomendada) donde puedes guardar tu respaldo `.sql`.
- `*.html` y `*.css`: Archivos del frontend.