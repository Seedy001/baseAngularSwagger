    
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    // Récupérer le token de l'en-tête Authorization
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('mdp authorize:',token);
    if (token) {
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user; // Ajouter les informations de l'utilisateur à la requête
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

module.exports = authenticateJWT;
