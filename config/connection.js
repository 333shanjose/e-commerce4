const mongoClient=require('mongodb').MongoClient
const status={
    db:null
}
module.exports.connect=function(done){
    const url='mongodb+srv://mernstack-user1:mernstack-user1@cluster0.oeca437.mongodb.net/?retryWrites=true&w=majority'
   

 mongoClient.connect(url,(err,data)=>{
     
 if(err) return done(err)
 status.db=data.db(dbname)
 
 done()

 })
 
}
module.exports.get=function(){
    return status.db;
}
