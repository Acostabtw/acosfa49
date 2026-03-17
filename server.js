const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3050;

// Middleware
app.use(cors());
app.use(express.json());
// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null
});

db.connect((err) => {
    if (err) {
        console.error('!!! ERROR AL CONECTAR CON MYSQL:', err.message);
        console.error('Asegúrate de que MySQL Workbench esté corriendo y que la base de datos "acosfa" exista.');
        return;
    }
    console.log(`✅ Conectado a la base de datos MySQL "${process.env.DB_NAME || 'acosfa'}".`);
});

// Manejo de errores globales del servidor
process.on('uncaughtException', (err) => {
    console.error('❌ EXCEPCIÓN NO CAPTURADA:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ RECHAZO NO MANEJADO en:', promise, 'razón:', reason);
});

// Endpoint: Registrar nuevo usuario
app.post('/registro', (req, res) => {
    const { nombre, apellido, correo, password } = req.body;

    if (!nombre || !apellido || !correo || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const sql = `INSERT INTO registro (nombre, apellido, correo, contraseña) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nombre, apellido, correo, password], (err, results) => {
        if (err) {
            console.error(err);
            // Manejo básico de error
            return res.status(500).json({ error: 'Error al registrar en la base de datos.' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente', id: results.insertId });
    });
});

// Endpoint: Iniciar sesión
app.post('/login', (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }

    const sql = `SELECT * FROM registro WHERE correo = ? AND contraseña = ?`;
    db.query(sql, [correo, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
        if (results.length > 0) {
            // Usuario encontrado
            const row = results[0];
            res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: { nombre: row.nombre, correo: row.correo } });
        } else {
            // Usuario no encontrado o contraseña incorrecta
            res.status(401).json({ error: 'Credenciales incorrectas.' });
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor activo en el puerto ${PORT}`);
});
