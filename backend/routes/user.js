const express = require('express')
const router = express.Router()


const { signin, signup, list,count}  = require("../controllers/user");

router.post('/signin', signin)
router.post('/signup',signup);
router.get('/users',list);
router.get('/users/count',count);


module.exports = router