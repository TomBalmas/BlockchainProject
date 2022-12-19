var async=require('async')//for the async series in insertToSchema
let ret = null
let isEmailExists = true
let  _mong = null, _mod = {}

function connectToDB() {
    try {//Dc5WwoTTm0ApJXJt
    var mong = require('mongoose');
    mong.connect("mongodb+srv://aaa:Dc5WwoTTm0ApJXJt@cluster0.vxhjmjh.mongodb.net/test");
    var dbtest = mong.connection;
    dbtest.on('error', console.error.bind(console, 'connection error:'));
    console.log("Connection To DB Successful!");
    _mong = mong;
} catch (error) {
    console.log(error) 
}
}
 function createSchema(schemaName, fields){
    try{ 
        if(_mong == null)
            connectToDB();
        const Schema = _mong.Schema(fields);
        _mod[schemaName] = _mong.model(schemaName, Schema);
        //return mong.model(schemaName, Schema);
    }
    catch(e)
    { 
        console.log(e.message);
    }
}



function insertToSchema(fields, values,  res){
    let schemaName = "Users"
    try{
        async.series([
            function(next){//connect to db
                if(_mong==null){
                    connectToDB();
                }
                next();
            },
            function(next){//create the schema
                if(!isKeyInMap(_mod,schemaName))//load the schema if its not loaded yet
                    //_mod[schemaName] = createSchema(schemaName, fields, _mong);
                    createSchema(schemaName, fields, _mong);
                
                next();
            },
            function(next){//checks if the document is already in the schema
                if(isSignUp)
                    _mod[schemaName].exists({'email': values["email"]},  (err, doc)=>{
                        if(err)
                            res.json({ answer: "error in db "+ err, status:"Failed" });
                        else
                            ret = doc;
                        next();
                    });
                else
                    next();
                },
            function(next){//checks if the document is already in the schema
                if(ret == null)
                    isEmailExists = false;//doesnt exist
                
                next();
            },    

            function(next){//creates new document in the schema
                if(!isEmailExists){
                    const newRecord = new _mod[schemaName](listsToMap(fields,values));
                    newRecord.save();
                }
                next();
            },
            function(next){//sending a respond to the client
                
                    if(!isEmailExists)
                        res.json({ answer: "Ok", status:"Ok" });
                    else
                        res.json({ answer: "exists" , status:"Failed" });
            }
         ]);
    }catch(e){
        res.json({ answer: "error in db "+ exception, status:"Failed"});
    }
    
}


function login(email, pass, res){
    try{
    let schemaName = "Users"
    let queryRes = null
    async.series([
        function(next){
            if(!isKeyInMap(_mod, schemaName))
                createSchema(schemaName, null);
            _mod[schemaName].findOne({'email': email }, function (err, docs) {
                if (err){
                    res.json({ answer: "error in db "+ err , status:"Failed"});
                }
                else{
                    queryRes = docs;
                    next();
                }
                
            });
        },
        function(next){
            if (queryRes == null) 
                res.json({ answer: "This email is not in our system", status:"Failed"});
            else{
                if (queryRes.password === pass) 
                    res.json({answer: queryRes._doc._id,status:"Ok"});
                else
                    res.json({ answer: "Wrong password", status:"Failed"});
            }
        },
        

    ]);
    }catch(exception)
    { res.json({ answer: "error in db "+ exception, status:"Failed"});}
}

module.exports = {login, insertToSchema}