const mongoClient=require('mongodb').MongoClient
const status={
    db:null
}
module.exports.connect=function(done){
    const url="mongodb://0.0.0.0:27017"
    const dbname="product"

 mongoClient.connect(url,(err,data)=>{
     
 if(err) return done(err)
 status.db=data.db(dbname)
 
 done()

 })
 
}
module.exports.get=function(){
    return status.db;
}
