import React from "react";
 import { useState,useEffect } from "react";
import axios from "axios";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
function Tasks(props){
     

    
    const [task,setTask]=useState({date:props.date,name:""});
   
    const [taskarray,setTaskarray]=useState([]);
    useEffect(() => {
        axios.get('https://todo-list-api-gs2r.onrender.com/')
          .then(response => {
            setTaskarray(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
          
      }, []);
    function handleChange(event){
        const {name,value}=event.target
        setTask(prevtask=>{
            return {...prevtask,[name]:value}})
    }
    function handleSubmit(event){
        
        if(task.name===""){
            alert("please enter the task");
        }
        else{
            task.date=props.date;
            console.log(task);
            axios.post('https://todo-list-api-gs2r.onrender.com/', task)
                .then(response => {
                    console.log('Response from server:', response.data);
                    
                    
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
           
          
      
        }
    }
    function handleUpdate(id){
        const newname=prompt("enter the updated value");
        const newtask={name:newname};
        console.log(newtask);
        axios.put(`https://todo-list-api-gs2r.onrender.com/update/${id}`,newtask)
        .then(response => {
            console.log(response.data)
            
            })
            .catch(error => {
            console.log(error);
            });
           
      
        }
    function handleDelete(id){
        console.log(id)
        axios.delete(`https://todo-list-api-gs2r.onrender.com/delete/${id}`)
        .then(response => {
            console.log(response.data); // Success message or additional handling
            
          })
          .catch(error => {
            console.error(error); // Error handling
          });
    }
    const filteredArray=taskarray.filter(task=>task.date===props.date);

    return(
        <div className="tasks">
            
            <div className="date">{props.date} </div>
            <div className="form">
                <form >
                <input type="text" name="name" value={task.name} onChange={handleChange}/>
                <button type="submit"><FontAwesomeIcon className="icons" icon={faCirclePlus} onClick={handleSubmit} /></button>
                </form>
            </div>
            
            <div className="taskcontainer">{filteredArray.map((task)=>(
                <form className="task"><div>{task.name}</div><button type="submit"><FontAwesomeIcon className="icons" icon={faPenToSquare} onClick={()=>handleUpdate(task._id)}/></button> <button type="submit"></button><button><FontAwesomeIcon className="icons" icon={faTrash} onClick={()=>handleDelete(task._id)}/></button></form>
                
            ))}</div>
            


           
        </div>
    )
}
export default Tasks;