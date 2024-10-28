const express = require('express')
const app = express()
const cors = require('cors')
require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')

app.use(express.json());
app.use(cors());
app.post('/register', async(req,res)=>{
  const existUser = await User.findOne(req.body)
  if(existUser)
  {
    res.send({
      success:false,
      message:"User alreay registered"
    })
  }
  else{
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject()
  delete result.password;
  res.send({
    success:true,
    user:result
  })      
}
})

app.post('/login',async(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  if( email && password){
    const user = await User.findOne(req.body).select('-password')
    if(!user){
      res.send({
        success:false,
        message:"User not found"
      })
      }
      else{
        res.send({
          success:true,
          user:user
        })
      }
   
  }
  else{
    res.send({
      success:false,
      message:"Provide All fields"
    })
  }

})

app.post("/add-product",async(req,res)=>{
  let product = new Product(req.body)
  const result = await product.save();
  res.send(result)
})

app.get('/products',async (req,res)=>{
  let products = await Product.find()
  if(products.length > 0)
  {
    res.send(products)
  }
  else{
    res.send({
      success:false,
      result:"Products Not found"
    })
  }
})

app.delete('/product/:id', async(req,res)=>{
  let id = req.params.id;
  const result =await Product.deleteOne({_id:id})
  res.send(result)
})

app.get('/product/:id', async(req,res)=>{
  let id = req.params.id;
  const result =await Product.findById({_id:id})
  res.send(result)
})

app.put('/product/:id', async(req,res)=>{
  let result = await Product.updateOne(
    {_id:req.params.id},
    {
      $set:req.body 
    }
  )
  res.send(result)
})

app.get('/search/:key' , async(req,res)=>{
    let result = await Product.find({
      "$or":[
        {title:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}}
      ]
    })
    res.send(result)
})
app.listen(5000)