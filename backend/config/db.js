const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Atlas conectado exitosamente`);
        console.log(`📊 Base de datos: ${conn.connection.db.databaseName}`);
        console.log(`🌐 Host: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        // Detener la aplicación si no hay conexión
        process.exit(1);
    }
};

module.exports = connectDB;