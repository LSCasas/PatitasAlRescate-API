// Cargar las variables de entorno
require("dotenv").config();

// Importar el servidor y la base de datos
const server = require("./src/server");
const db = require("./src/lib/db");

// Definir el puerto del servidor
const PORT = process.env.PORT || 5500;

// Conectar a la base de datos y arrancar el servidor
db.connect()
  .then(() => {
    console.log("DB connected");
    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });