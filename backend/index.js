require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const cors =require("cors");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://todo-list-rwgd.onrender.com"); // replace with your frontend's URL
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({origin:'https://todo-list-rwgd.onrender.com'}));
const PORT=process.env.PORT;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);
// mongoose.connect("mongodb://localhost:27017/todoDB");
const taskSchema={
  date:String,
    name:String
}
const task = mongoose.model("task", taskSchema);
app.get('/', function(req, res){

    async function f1() {
      const tasks = await task.find();
  
      res.json(tasks);
  
    }
    f1();
    
    // Send the users array back to the frontend as JSON
    
  });
app.post("/", function (req, res) {
    const {date,name} = req.body;
    const newTask = new task({date,name});
    newTask.save();
    res.json({
      message: 'Data received!'
    });
})
app.put('/update/:id', (req, res) => {
    const {name}=req.body;
    const id = req.params.id
  
    task.updateOne({_id:id},{$set:{name:name}})
    .then(result => {
      console.log(result.modifiedCount); // Handle the result of the update operation
    })
    .catch(error => {
      console.error(error); // Handle errors
    });
  
    
  
    res.status(200).json({ message: 'Customer updated successfully' });
  });
app.delete('/delete/:id', (req, res) => {
    task.findByIdAndDelete(req.params.id)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(500).json({ success: false, error: err }));
  });
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})