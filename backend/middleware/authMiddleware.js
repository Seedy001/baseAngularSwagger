// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'secret'; // Doit être la même clé utilisée dans authenticateJWT

const token = jwt.sign({ username: 'user' }, secretKey, { expiresIn: '1h' });
console.log('Generated Token:', token);
 // Remplacez par votre clé secrète

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupérer le jeton du header

  if (token == null) return res.sendStatus(401); // Pas de jeton, pas d'accès

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Jeton invalide

    req.user = user; // Attacher les informations utilisateur à la requête
    next(); // Continuer avec la demande
  });
};

module.exports = authenticateJWT;
