const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Veuillez remplir ce champs'
    },
    type: {
        type: String,
        required: 'Veuillez remplir ce champs'
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    warranty: {
        type: Number
    }
   
});

mongoose.model('Product', productSchema); 