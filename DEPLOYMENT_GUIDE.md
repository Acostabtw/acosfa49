# Guía de Despliegue en la Nube (Aiven + Render)

Sigue estos pasos para que tu proyecto esté en internet y funcione desde cualquier lugar.

## Paso 1: Crear la Base de Datos en Aiven
1. Regístrate en [Aiven.io](https://aiven.io/).
2. Haz clic en **Create Service**.
3. Selecciona **MySQL**.
4. En el plan, elige el **Free Plan** (es gratis para siempre).
5. Selecciona una ubicación (la más cercana a ti, ej. Virginia/EE.UU. o Europa).
6. Haz clic en **Create Service**.

## Paso 2: Conectar MySQL Workbench a la Nube
Una vez que el servicio en Aiven diga "Running":
1. Ve a la sección **Connection information**.
2. En MySQL Workbench, crea una **New Connection**.
3. Copia el **Host**, **Port**, **User** y **Password** de Aiven a Workbench.
4. Conéctate y abre tu archivo `database.sql`.
5. Ejecuta todo el script para crear tus tablas en la nube.

## Paso 3: Subir tu Código a GitHub
Antes de ir a Render, asegúrate de que tus últimos cambios estén en GitHub.
Si usas la web de GitHub, sube los archivos editados (`server.js`, `package.json`, `.gitignore`).

## Paso 4: Desplegar en Render
1. Regístrate en [Render.com](https://render.com/) con tu cuenta de GitHub.
2. Haz clic en **New +** > **Web Service**.
3. Selecciona tu repositorio `proyecto1`.
4. En **Build Command**, pon: `npm install`
5. En **Start Command**, pon: `npm start`
6. Haz clic en **Environment** y agrega estas variables con los datos de Aiven:
   - `DB_HOST`: (tu host de Aiven)
   - `DB_USER`: `avnadmin` (o el que diga Aiven)
   - `DB_PASSWORD`: (tu password de Aiven)
   - `DB_NAME`: `defaultdb` (o el que diga Aiven)
   - `DB_PORT`: `(tu puerto de Aiven)`
7. Haz clic en **Create Web Service**.

¡Al terminar, Render te dará un link personalizado (ej: `https://acosfa.onrender.com`)!
