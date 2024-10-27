const express = require('express');
const sequelize = require('./src/config/database');

const app = express();

app.use(express.json());

// Sincronizar la base de datos
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((err) => {
        console.error('Error syncing the database:', err);
    });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
