const express=require("express");
const mysql=require("mysql");
const app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//create connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Karthick@1601",
    database:"crud_task"

});

//connect
db.connect((err)=>{
    if(err){
       throw err;
    }
    else{
    console.log("mysql connected....");
    }
});

app.post('/value',(req,res)=>{
    const name=req.body.name;
    const address=req.body.address;
    const id=req.body.id;
 db.query('insert into employeedetails values (?,?,?)',[name,address,id],function(err,result){
   if (err) throw err;
   res.send("one row affected");
 });
})


//update 
app.put("/update/:id",(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const address=req.body.address;
    db.query("update employeedetails set name=?,address=? where id=? ",[name,address,id],(err,results)=>{
        if(err) throw err;
        res.send("record updated"); 
    });
}) 

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const address=req.body.address;
    db.query("delete from employeedetails where id=?",[id],(err,results)=>{
        if(err) throw err;
        res.send("record deleted");
    })
})


app.listen(3300,()=>{
    console.log("port running at 3300....");
})
