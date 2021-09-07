const express = require('express')
const router = express.Router()


const { create,read,update,remove,list }  = require("../controllers/orderitem");

router.post('/orderitem', create)
// router.get('/orderitem/:id',read);
router.get('/orderitems',list);
// router.put('/orderitem/:id', update)
router.delete('/orderitem/:id', remove)


module.exports = router