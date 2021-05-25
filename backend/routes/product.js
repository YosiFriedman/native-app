const express = require('express')
const router = express.Router()


const { create,read,update,remove,list,count, featured }  = require("../controllers/product");

router.post('/product', create)

router.get('/product/:id',read);
router.get('/products',list);
router.get('/products/count',count);
router.get('/products/featured/:count',featured);
router.put('/product/:id', update)
router.delete('/product/:id', remove)


module.exports = router