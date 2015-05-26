var express = require('express');
 var app     = express();
var mongojs = require('mongojs');
var db = mongojs('productdb',['productdb']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/prodlist', function(req,res){
console.log("i get request");
 
  db.productdb.find(function(err,docs){
   console.log(docs);
   res.json(docs);

  });

});

app.post('/prodlist',function(req,res){
  console.log("in body" + req.body);
  db.productdb.insert(req.body,function(err,doc){
   res.json(doc);
  })
});

app.delete('/prodlist/:id', function(req,res){
var id = req.params.id;
console.log(id);
db.productdb.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
res.json(doc);

})
});


app.get('/prodlist/:id', function(req,res){
var id = req.params.id;
console.log("in get2" + id);

db.productdb.findOne({prod_id: id}, function(err,doc){
res.json(doc);

});
});

app.put('/prodlist/:id', function(req,res){
var id = req.params.id;
console.log(id);
console.log(req.body.name);
db.productdb.findAndModify({query: {_id: mongojs.ObjectId(id)},
   update: {$set: {desc: req.body.desc,sp: req.body.sp}},
    new:true}, function(err,doc){
       res.json(doc);
      });
 });
   
 app.listen(3000);  
console.log("server running on port 3000");
