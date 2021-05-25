const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        
    },
    email: {
        type: String,
        trim: true,
       
    },
    passwordHash: {
        type: String,
        trim: true,
        
    },
    
    isAdmin: {
        type:String,
        required: true,
    },
   
        
  
}, {timestamps: true})

userSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
userSchema.set('toJSON',{
    virtuals: true,
})
module.exports = mongoose.model("User", userSchema);