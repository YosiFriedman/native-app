
const Product = require('../models/product');
const Category = require('../models/category');


// read a product
exports.read = async(req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if(!product) {
        res.status(500).json({message:'הקטגוריה לא נמצאה'})
    } 
    res.status(200).send(product)
}
// read products
exports.list = async(req, res) => {
let filter = {};
if(req.query.categories)
{
    filter = {category: req.query.categories.split(',')}
}
    const productList = await Product.find(filter).populate('category')

    if(!productList) {
        res.status(500).json({success:false})
    }
    res.send(productList)
   }

   exports.update = async(req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('קטגוריה לא נכונה')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
        name:req.body.name,
        description: req.body.description,
        richdescription: req.body.richdescription,
        image: req.body.image,
     
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        },
        {new: true}
        )
        if(!product) {
            res.status(404).send({message:'הקטגוריה לא יכולה להתעדכן'})
        } 
        res.status(200).send(product)
    

}

//delete product
exports.remove = (req, res) => {
 Product.findByIdAndDelete(req.params.id).then(product => {
     if(product){
         return res.status(200).json({success: true, message:'הקטגוריה נמחקה'})
     } else {
         return res.status(404).json({success:false, message:'הקטגוריה לא נמצאה'})
     }
     
 }).catch(err =>{
    return res.status(400).json({success:false, err:err})
 })
}


exports.count = async(req, res) => {
    const productCount =  await Product.countDocuments((count) => count)
    
    res.send({productCount})
     }


exports.featured = async(req, res) => {
    const count = req.params.count ? req.params.count : 0
    const productsFeatures =  await Product.find({isFeatured: true}).limit(+count)
    if(!productsFeatures){
        res.status(500).json({success:false})
    }  
    res.send({productsFeatures})
}
    
   


  