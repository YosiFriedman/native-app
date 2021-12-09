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
    
    role: {
        type:String,
        required: true,
       
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        
    }
   
        
  
}, {timestamps: true})

userSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
userSchema.set('toJSON',{
    virtuals: true,
})
module.exports = mongoose.model("User", userSchema);