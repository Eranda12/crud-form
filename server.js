const express = require('express');

// init instance app

const app = express ();

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));






var bodyParser = require('body-parser');

// Body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//setup mongodb
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/contract';
const ObjectId = require('mongodb').ObjectId;

MongoClient.connect(mongoUrl, function(err,db) {
    
    if(err){
        console.log(err);
        return;
    }
    console.log('Database successfully connected!');
    contract = db.collection('contract');
});
        
app.get('/',function (req,res){ 
    
    contract.find().toArray(function(err,docs) {
        if(err){
            console.log(err);
            return;
        }
    res.render('index' , { docs: docs});
    });
});

app.get('/contracts',function (req,res){ 
    
    contract.find().toArray(function(err,docs) {
        if(err){
            console.log(err);
            return;
        }
    res.render('contracts' , { docs: docs});
    });
});

app.get('/contracts/table',function (req,res){ 
    
    contract.find().toArray(function(err,docs) {
        if(err){
            console.log(err);
            return;
        }
    res.render('table' , { docs: docs});
    });
});

app.post('/contracts/add',function (req,res){
    contract.insert(req.body , function (err, result){
        if(err){
            console.log(err);
            return;
        }
      contract.find().toArray(function(err,docs) {
        if(err){
            console.log(err);
            return;
        }
    res.render('table' , { docs: docs});
    });
  });
});

app.get('/contracts/edit/:id', function(req,res){
    
    contract.findOne({_id: ObjectId(req.params.id)}, function(err, doc){
        if(err){
            console.log(err);
            return;
        }
    res.render('edit',{doc: doc});
    });
    
});

app.post('/contracts/update/:id', function(req,res){
    
    
    contract.updateOne({_id: ObjectId(req.params.id)},
                    {$set: { 
					nr_rendor: req.body.nr_rendor, 
					lloji_prokurimit: req.body.lloji_prokurimit, 
					aktiviteti_prokurimit: req.body.aktiviteti_prokurimit, 
					data_inicimit: req.body.data_inicimit, 
					data_publikimit: req.body.data_publikimit, 
					data_nenshkrimit: req.body.data_nenshkrimit, 
					afatet_implementim: req.body.afatet_implementim, 
					data_permbylljes: req.body.data_permbylljes, 
					data_pranimit_perkohshem: req.body.data_pranimit_perkohshem, 
					cmimi_kontrates: req.body.cmimi_kontrates, 
					cmimi_total: req.body.cmimi_total, 
					first_last_name: req.body.first_last_name
					
					} },
                     function(err, result){
                    if(err){
                    console.log(err);
                    return;
    }         
    res.redirect('/contracts/table');
    
  });
});

app.get('/contracts/delete/:id', function(req,res){
    contract.deleteOne({_id: ObjectId(req.params.id)}, function(err,result){
        if(err){
            console.log(err);
            return;
        }
    
    res.redirect('/contracts/table');
    });
        
});

app.listen(3000,function(){
          console.log('App running at port 3000');
});

