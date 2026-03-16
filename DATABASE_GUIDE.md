# Guía de Configuración de Base de Datos (MySQL)

Para que el proyecto funcione en cualquier PC, sigue estos pasos para exportar e importar la base de datos `acosfa`.

## 1. Exportar la Base de Datos (Desde tu PC actual)

1. Abre **MySQL Workbench**.
2. Ve al menú superior: **Server** > **Data Export**.
3. Selecciona la base de datos `acosfa` en el panel de la izquierda.
4. En "Export Options", selecciona **Export to Self-Contained File**.
5. Elige una ruta dentro de la carpeta de tu proyecto (por ejemplo: `sql/acosfa_backup.sql`).
6. Asegúrate de que "Include Create Schema" esté marcado (opcional pero recomendado para que cree la DB si no existe).
7. Haz clic en **Start Export**.

**¡Importante!**: Ahora que tienes el archivo `.sql`, asegúrate de subirlo a GitHub junto con el resto de tus archivos.

---

## 2. Importar la Base de Datos (En la nueva PC)

1. Clona el repositorio de GitHub en la nueva PC.
2. Abre **MySQL Workbench**.
3. Ve al menú superior: **Server** > **Data Import**.
4. Selecciona **Import from Self-Contained File**.
5. Busca el archivo `.sql` que descargaste de GitHub (ej. `sql/acosfa_backup.sql`).
6. Haz clic en **Start Import**.
7. Refresca tus esquemas en Workbench; ahora deberías ver la base de datos `acosfa` con sus tablas y datos.

---

## 3. Configuración del Servidor

El archivo `server.js` está configurado para conectarse a `localhost` con el usuario `root`. Si tu configuración de MySQL en la nueva PC es diferente (por ejemplo, tiene contraseña), asegúrate de actualizar los valores en:

```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tu_password_aqui',
    database: 'acosfa',
    port: 3306
});
```
