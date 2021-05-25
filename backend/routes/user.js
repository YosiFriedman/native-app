const express = require('express')
const router = express.Router()


const { signin, signup, list}  = require("../controllers/user");

router.post('/signin', signin)
router.post('/signup',signup);
router.get('/users',list);


module.exports = router