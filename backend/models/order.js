const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
{
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
       
        default:'ממתין'
    },
    totalPrice:{
        type:Number,
    },

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    dateOrdered:{
        type:Date,
        default: Date.now
    },
    
    orderItems: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required: true
    }],
   
},
{timestamps: true}
);
orderSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
orderSchema.set('toJSON',{
    virtuals: true,
})

 module.exports = mongoose.model("Order", orderSchema);