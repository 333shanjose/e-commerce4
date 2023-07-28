const { response } = require('express');
var express = require('express');
const producthelpers = require('../helpers/producthelpers');
const userhelper = require('../helpers/userhelper');
var router=express.Router();


router.get('/', function(req,res,next){
  console.log('football')
  let ad=req.session.admin
  console.log(ad)
    
    producthelpers.getAllProducts().then((products)=>{
      
      res.json({products,ad});
    })
  })
  router.get('/loginn',function(req,res){
    if(req.session.admin){
  
      console.log(req.session.admin)
      res.json()
    }else{
      
      
      req.session.adminLoginErr=false
      
    }
  });
  router.get('/orderproductss/:name',async(req,res)=>{
       
    let products=await userhelper.getorderProducts(req.params.name)
    res.json({products})
  })
    router.post('/signup',(req,res)=>{
      console.log(req.body)
      producthelpers.doSignup(req.body).then((response)=>{
       
       req.session.admin=response
       req.session.admin.loggedIn=true
         console.log(req.session.admin);
      })
    
     
      });
      router.get('/orderhistoryy',async(req,res)=>{
        let orderdetails=await userhelper.getOrderdetails()
    
        console.log(orderdetails)
        res.json({orderdetails})
   });
   router.get('/userslists',async(req,res)=>{
    
     
     let users=await userhelper.findUsers()
       console.log(users)
     
     
   res.json({users})
        
   });
   router.get('/delete-products/:id',(req,res)=>{
    let proId=req.params.id
    producthelpers.deleteproduct(proId).then((response)=>{
      console.log(response)
      res.json({response})
    })
    
  });
  
   router.post('/edit-products/:id',(req,res)=>{
     console.log('kkl')
     console.log(req.params.id)
     console.log(req.body)
    producthelpers.updateOne(req.params.id,req.body).then(()=>{
       
       if(req.files.images){
       let id=req.params.id
       let image=req.files.images
       image.mv('./client/public/productimages/'+id+'.jpg')
  
       }
    })
 })

    router.post('/loginn',(req,res)=>{
      producthelpers.doLogin(req.body).then((response)=>{
          if(response.status){
           req.session.admin=response.admin
            req.session.admin.loggedIn=true
            
            res.json()
          }else{
           req.session.adminLoginErr="invalid username or password"
            
          }
      })
    });
router.post('/addproduct',(req,res)=>{
  req.body.Price=parseInt(req.body.Price)
     
     producthelpers.addproducts(req.body,(id)=>{
      
       let image=req.files.images
          
          
       image.mv('./client/build/productimages/'+id+'.jpg',(error)=>{
          if(!error){
            console.log('sucessfull')
          }else{
            console.log(error);
          }
       })
     })
       res.json(image)
       console.log(image)
    });
  
        
        
      
  module.exports= router;
