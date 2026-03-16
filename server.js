const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3050;

// Middleware
app.use(cors());
app.use(express.json());
// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Conexión a la base de datos SQLite
const dbPath = path.resolve(__dirname, 'acosfa.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos acosfa.db.');
        // Crear tabla registro si no existe
        db.run(`CREATE TABLE IF NOT EXISTS registro (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error al crear la tabla registro:', err.message);
            } else {
                console.log('Tabla registro lista.');
            }
        });
    }
});

// Endpoint: Registrar nuevo usuario
app.post('/registro', (req, res) => {
    const { nombre, apellido, correo, password } = req.body;

    if (!nombre || !apellido || !correo || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const sql = `INSERT INTO registro (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nombre, apellido, correo, password], function(err) {
        if (err) {
            // Si el correo ya existe, SQLite dará un error de CONSTRAINT UNIQUE
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(409).json({ error: 'El correo ya está registrado.' });
            }
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente', id: this.lastID });
    });
});

// Endpoint: Iniciar sesión
app.post('/login', (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }

    const sql = `SELECT * FROM registro WHERE correo = ? AND password = ?`;
    db.get(sql, [correo, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
        if (row) {
            // Usuario encontrado
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: { nombre: row.nombre, correo: row.correo } });
        } else {
            // Usuario no encontrado o contraseña incorrecta
            res.status(401).json({ error: 'Credenciales incorrectas.' });
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
