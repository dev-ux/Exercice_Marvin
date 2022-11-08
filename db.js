const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://moon_state:ZXFxcfufeujJ2q7@expressapi.b3hglqr.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true
}, (err) => {
    if(!err){
        console.log('Connexion à MongoDB reussie')
    }else{
        console.log('Erreur de connexion à la base de données: ' + err)
    }
});

require('./product.model');