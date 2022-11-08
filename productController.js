const express = require('express');
var router = express.Router();
const mongoose = require ('mongoose')
const Product = mongoose.model('Product');

router.get('/', (req, res) =>{
    res.render("product/addOrEdit",{
        viewTitle : "Insert Product"
    });
});

router.post('/', (req, res) =>{
    if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

function insertRecord(req, res){
    var product = new Product();
    product.name = req.body.name;
    product.type = req.body.type;
    product.price = req.body.price;
    product.rating = req.body.rating;
    product.warranty = req.body.warranty;
    product.save((err, doc) =>{
        if(!err)
        res.redirect('product/list');
        else{
            if(err.name == 'ValidatorError'){
            handleValidatorError(err, req.body);
            res.render("product/addOrEdit",{
                viewTitle : "Insert Product",
                product: req.body
            });
            }
            else
            console.log('Erreur pendant l insertion ' + err);
        }
    });

}

function updateRecord(req, res){
    Product.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {res.redirect('product/list');}
        else{
            if(err.name == 'ValidationError'){
                handleValidatorError(err, req.body);
                res.render("product/addOrEdit", {
                    viewTitle: 'Update Product',
                    product: req.body
                });
            }
            else
            console.log('Erreur de mise à jours : ' + err);
        }
    });
}

router.get('/list', (req, res) =>{
    Product.find((err, docs) =>{
        if(!err){
            res.render("product/list", {
                list: docs
            });
        }else{
            console.log('Error pendant l affichage de la list: ' + err);
        }
    });
});


function handleValidatorError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;

                case 'type':
                    body['typeError'] = err.errors[field].message;
                    break;

                    case 'price':
                        body['priceError'] = err.errors[field].message;
                        break;

                        default:
                        break;
        }
    }
}

router.get('/:id', (req, res) =>{
    Product.findById(req.params.id, (err, doc) =>{
        if(!err){
            res.render("product/addOrEdit",{
                viewTitle: "Update article Data",
                product: doc
            })
        }
    });
});

router.get('/delete/:id',  (req, res) =>{
    Product.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            res.redirect('/product/list')
        }else{
            console.log('Erreur pendant la supression : ' + err);
        }
    });
});

module.exports = router;