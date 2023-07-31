const { response } = require('express');
var express = require('express');

var router=express.Router();
const producthelpers = require('../helpers/producthelpers');
const userhelper=require('../helpers/userhelper');

router.get('/',function(req, res) {
  
   
  console.log('user')
    
    
    producthelpers.getAllProducts().then((res)=>{
       console.log(res)
       products=res
    })
      res.json(products)
  
  });
  router.post('/signup',(req,res)=>{
   
    userhelper.doSignup(req.body).then((response)=>{
      req.session.user=response
      
      req.session.user.loggedIn=true
       console.log(response);
       
    })
  });
  router.post('/place-order',async(req,res)=>{
    console.log(req.body);
    let userId=req.session.user[0]._id
    console.log(req.session.user[0]._id)
  
   let  products=await userhelper.getcartProducts(req.session.user[0]._id)
   let total=await userhelper.getTotal(req.session.user[0]._id)
  let orderId=await userhelper.placeorder(userId,req.body,products,total)
  
     
        

                res.json(response)
          
              
      
  });
  router.get('/loginn',function(req,res){
  
    if (req.session.user) {
      
         res.json()
    }else{
      console.log('mann')
    }
     
    });
      router.get('/productt/:id',function(req, res) {
  
   
  
      
      
      producthelpers.getProduct(req.params.id).then((res)=>{
          
        
         product=res
      })
        res.json(product)
      })
    router.get('/logoutt',function(req,res){
  
      req.session.user=null
      
      req.session.user.loggedIn=false
      res.redirect("/")
    });
    router.get('/cartt',async(req,res)=>{
      
      
     let products=await userhelper.getAllcarts(req.session.user[0]._id)
     let total=await userhelper.getTotal(req.session.user[0]._id)
     let user=req.session.user[0]._id
      
      
      res.json({products,user,total})
    });
  router.post('/loginn',(req,res)=>{
    
    userhelper.doLogin(req.body).then((response)=>{
        if(response.status){
            
         
         
         req.session.user=response.user
         req.session.user.loggedIn=true
         res.redirect('/')
       
          
        }else{
         req.session.userLoginErr="invalid username or password"
          
        }
    })
   });
   router.post('/change-product',(req,res)=>{
     
      console.log(req.body)
    userhelper.changeProducts(req.body).then(async(response)=>{
       response.total=await userhelper.getTotal(req.body.user)
       
       res.json(response)
    
    })
    
});
router.post('/remove-product',(req,res)=>{
  userhelper.removeProducts(req.body).then((response)=>{
    res.json(response)
  })
});
   router.get('/add-cart/:id',(req,res)=>{
    console.log(req.params.id)
    console.log(req.session.user[0]._id)
    userhelper.getCarts(req.params.id,req.session.user[0]._id).then(()=>{
        
    
      res.json({status:true})
      
      
   
    })
    
   
    
  })

 
    
  module.exports = router;
