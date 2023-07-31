var db=require('../config/connection')
var collections=require('../config/collection');
var objectId=require('mongodb').ObjectId;
var bcrypt=require('bcrypt')
const { resolve } = require('promise');
 
module.exports={
    addproducts:(damss,callback)=>{
  db.get().collection(collections.PRODUCT_HELPERS).insertOne(damss)
    
    
    callback(damss._id)
    console.log(damss._id)
    

        
        
        
        
        
  
},
doSignup:(adminData)=>{
    
  return new Promise(async(resolve,reject)=>{
      adminData.Password=await bcrypt.hash(adminData.Password,10)
          
      db.get().collection(collections.ADMIN_COLLECTION).insertOne(adminData).then((response)=>{
          resolve(response)
           
      })
  })

},
doLogin:(adminData)=>{
  return new Promise(async(resolve,reject)=>{
 
  let loginStatus=false
  let response={}
  let admin=await db.get().collection(collections.ADMIN_COLLECTION).findOne({email:adminData.Email})
  if(admin){
      bcrypt.compare(adminData.Password,admin.Password).then((status)=>{
        if(status){
            console.log("loggin sucess");
            response.admin=admin
            response.status=true
            resolve(response)
        }else{
            console.log("loggin failed");
            resolve({status:false})
        }
      })
  }else{
      console.log("loggin failed");
      resolve({status:false});
  }

})
},
getAllProducts:()=>{
  return new Promise(async(resolve,reject)=>{
     let products=await db.get().collection(collections.PRODUCT_HELPERS).find().toArray()
     
     resolve(products)
  })
},
 getProduct:(proId)=>{
  return new Promise(async(resolve,reject)=>{
     let product=await db.get().collection(collections.PRODUCT_HELPERS).findOne({_id:objectId(proId)})
     
     resolve(product)
  })
},
deleteproduct:(proId)=>{
  return new Promise((resolve,reject)=>{
     db.get().collection(collections.PRODUCT_HELPERS).deleteOne({_id:objectId(proId)}).then((response)=>{
           resolve(response)
     })
  })
},
updateOne:(proId,prodetails)=>{
  return new Promise((resolve,reject)=>{
   db.get().collection(collections.PRODUCT_HELPERS).updateOne({_id:objectId(proId)},{
     $set:{
       name:prodetails.name,
       category:prodetails.category,
       discription:prodetails.discription,
       Price:prodetails.Price

        
     }
   }).then(()=>{
     resolve()
   })
  })
},
}




