const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
 authSchema.plugin(uniqueValidator) //permet de resteindre les user a utiliser 1 unique email 
const Authe = mongoose.model('auth', authSchema);

 module.exports = Authe;
