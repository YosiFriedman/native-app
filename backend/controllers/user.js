const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signin = async(req, res) => {
   const user = await User.findOne({email:req.body.email})
   const secret = process.env.JWT_SECRET
   if(!user) {
       return res.status(400).send('The user not found')
   }
   if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
       const token = jwt.sign(
           {
               userId: user.id
           },
           secret,
           {expiresIn: '1d'}
       )
     res.status(200).send({user: user.email, token: token});
   } else {
      return res.status(400).send('סיסמא לא נכונה ')
   }
   
}
exports.signup = async(req, res) => {
    const user = await new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin
    }).save()
    if(!user) {
        res.status(404).send({message:'הקטגוריה לא יכולה להיווצר'})
    } 
    res.status(200).send(user)
}

exports.list = async(req, res) => {
   const userList = await User.find().select("-passwordHash")
   if(!userList){
       res.status(500).json({succes:false})
   }
   res.send(userList)
   }
