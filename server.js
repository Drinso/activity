const express=require('express')
const app=express();
const moment = require('moment')
const cors=require(`cors`)
const path=require('path')
const mysql=require('mysql');
const { connect } = require('http2');

const logger = (req,res,next)=>{
    console.log(`${req.protocol}: // ${req.get('host')}${
        req.originalUrl} : ${moment ().format()}
        
        `)
        next()


}
const PORT=process.env.PORT || 5000;

const connection = mysql.createConnection({
host: 'api.sampleapis.com',
user: 'root',
password: '',

database: ''
})


//method GET - search - REPORT
connection.connect()
app.use(express.urlencoded({extended: false})); 
app.use(cors())
app.get('/coffee/hot',(req, res) =>{

connection
.query('SELECT * FROM userdata',(err, rows, fields) =>{

if(err) throw err

res.json(rows); 
})
})


//method GET - search - REPORT
app.get('/coffee/hot:id',(req, res) =>{
const id=req.params.id
connection
.query(`SELECT * FROM userdata WHERE id= '${id}'`,(err, rows, fields) =>{

if(err) throw err
if(rows.length > 0){
res.json(rows); 
}else{
res.status(400).json({msg:`${id} id not found!`})
}
})
})

// CRUD - create, report, update, delete 
//method POST - CREATE
app.post('/coffee/hot',(req, res) =>{
const fname=req.body.fname;
const lname=req.body.lname;
const email=req.body.email;
const gender=req.body.gender;

connection
.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}','${lname}','${email}','${gender}')`,(err, rows, fields) =>{
if(err) throw err
res.json({msg:`Successfully inserted!`})
})
})


// CRUD - create, report, update, delete 
//method PUT - update
app.put('/coffee/hot',(req,res) => {
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const gender=req.body.gender;
    const id=req.body.id;
    
    connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}',email='${email}', gender='${gender}' WHERE id=${id}`, (err,rows,fields) =>{

        if(err) throw err
        res.json({msg: `Successfully updated`})
    })
})

// CRUD - create, report, update, delete 
//method DELETE - delete
app.delete('/coffee/hot',(req, res) => {

    const id=req.body.id;
    connection.query(`DELETE FROM userdata WHERE id=${id}`,(err, rows, fields) =>{

        if(err) throw err
        res.json({msg:`Successfully deleted`})
    })
})


app.listen(5000, () => {
console.log(`Server is running in port ${PORT}`);

})


