const express=require('express')
const mongoose=require('mongoose')
const Product=require('./models/productModel')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//routes
app.get('/',(req,res)=>{
    res.send("Hello")})
app.get('/blog',(req,res)=>{
    res.send("Hello Blog")
})
app.get('/products',async(req,res)=>{
    try{
        const products=await Product.find(req.body);
        res.status(200).json(products);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
app.get('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const products=await Product.findById(id);
        res.status(200).json(products);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.post('/products',async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
//update a product
app.put('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:'cannot find product with the giver id '})
        }
    const updatedproduct=await Product.findById(id);
        res.status(200).json(updatedproduct);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
//delete a product
app.delete('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:'cannot find product with the giver id'})
        }
        res.status(200).json(product);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
}

)
mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://kavyapgk15:kavya1505@kavya.j311rv4.mongodb.net/NODE-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000,()=>{
        console.log("Node API is running on port 3000")
    });
}).catch((error)=>{
    console.log(error)
})