const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const userRoutes = require("./routes/user-route");
const authRoutes = require("./routes/auth-user-route")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API Documentation for User Management',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
   ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/user-route.js','./routes/auth-user-route.js'], // Chemin vers vos fichiers de définition des routes
  
};


// Initialiser Swagger
const specs = swaggerJsdoc(swaggerOptions);

// Configurer Swagger UI pour servir la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


var cors = require('cors');


const corsOptions = {
  origin: 'http://localhost:4200', // Remplace par l'URL de ton app Angular
  credentials: true, // Pour permettre l'envoi de cookies
  allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser les en-têtes nécessaires
};

app.use(cors(corsOptions));

app.use(cookieParser()); //décode les cookies envoyés par le client et les transforme en un objet JavaScript, accessible via req.cookies

app.use(express.json())
app.get('/', (req, res) => {
  res.send('boulette server ')
})

app.use(userRoutes);
app.use(authRoutes);

async function connectDB(){
   await mongoose.connect('mongodb://localhost:27017',{
    dbName: 'boulette',
   })
}
connectDB().catch((err)=>console.error(err));

app.listen(port, () => {
  console.log(`boulette app listening on port ${port}`)
})