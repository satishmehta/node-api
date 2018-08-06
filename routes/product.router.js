var express = require('express');
var router = express.Router();

let productCtrl = require('./../controllers/product.ctrl');
let reviewCtrl  = require('./../controllers/review.ctrl');

router.get('/', productCtrl.get);
router.get('/:pageSize/:pageIndex', productCtrl.get);
router.get('/:id', productCtrl.getById);
router.post('/', productCtrl.save);
router.delete('/:id', productCtrl.delete);
router.put('/:id',productCtrl.update);
//Saving Reviews
router.post('/reviews',reviewCtrl.save);


module.exports = router;