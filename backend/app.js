const express = require('express')
const app = express()
const port = 3000;
const mongoose = require('mongoose');
const userRoutes = require("./routes/user-route");

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


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
  apis: ['./routes/user-route.js'], // Chemin vers vos fichiers de définition des routes
};


// Initialiser Swagger
const specs = swaggerJsdoc(swaggerOptions);

// Configurer Swagger UI pour servir la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


var cors = require('cors');


app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(userRoutes);

async function connectDB(){
   await mongoose.connect('mongodb://localhost:27017',{
    dbName: 'boulette',
   })
}
connectDB().catch((err)=>console.error(err));

app.listen(port, () => {
  console.log(`boulette app listening on port ${port}`)
})