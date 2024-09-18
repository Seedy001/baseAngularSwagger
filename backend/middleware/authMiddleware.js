const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token; // Récupérer le token du cookie

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
