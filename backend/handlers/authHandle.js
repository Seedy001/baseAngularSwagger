
const Authuser = require('../db/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new Authuser({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  exports.login = (req, res, next) => {
    Authuser.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'utilisateur non trouvé' });
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Mot de passe incorrect !' });
                   }
                   const token = jwt.sign(
                       { userId: user._id },
                       'RANDOM_TOKEN_SECRET',
                       { expiresIn: '24h' }
                   );

                   // Afficher le token dans la console
                   console.log('Token généré :', token);
                    // Définir le cookie avec le token
                   res.cookie('auth_token', token, {
                    httpOnly: true, // empêche l'accès via JavaScript
                    secure: true,   // assure que le cookie est transmis uniquement sur HTTPS
                    maxAge: 24 * 60 * 60 * 1000 // durée de vie de 24 heures
                });
                   res.status(200).json({
                       userId: user._id,
                       token: token
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};


