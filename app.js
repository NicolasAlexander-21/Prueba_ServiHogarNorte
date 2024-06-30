const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const photoAdministrador = require('./src/routes/photoRoutes');
const app = express();

// Crear la carpeta 'uploads' si no existe
const uploadsDir = path.join(__dirname, 'src', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de multer para almacenar las fotos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // Carpeta donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar duplicados
    }
});
const upload = multer({ storage: storage });

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(uploadsDir));

// Usa las rutas para la carga de fotos
app.use('/api/admin/uploadphoto', photoAdministrador(upload));

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
