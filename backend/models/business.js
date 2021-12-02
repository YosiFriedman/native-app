const mongoose = require("mongoose");


const businessSchema = new mongoose.Schema(
{
    name: {
        type:String,
        required:"נדרש שם",
    },
},
{timestamps: true}
);

 module.exports = mongoose.model("Business", businessSchema);