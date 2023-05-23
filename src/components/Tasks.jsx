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
        axios.get('http://localhost:5000/')
          .then(response => {
            setTaskarray(response.data);
            
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
        axios.post('http://localhost:5000/', task)
        .then(response => {
            console.log('Response from server:', response.data);
            
        })
        .catch(error => {
            console.error('Error sending POST request:', error);
        });
        if(task.name===""){
            alert("please enter the task");
        }
        else{
            task.date=props.date;
            axios.post('http://localhost:5000/', task)
                .then(response => {
                    console.log('Response from server:', response.data);
                    
                })
                .catch(error => {
                    console.error('Error sending POST request:', error);
                });
                window.location.reload();
        }
    }
    function handleUpdate(id){
        const newname=prompt("enter the updated value");
        const newtask={name:newname};
        axios.put(`http://localhost:5000/update/${id}`,newtask)
        .then(response => {
            console.log(response.data)
                
            })
            .catch(error => {
            console.log(error);
            });
            window.location.reload();
      
        }
    function handleDelete(id){
        console.log(id)
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then(response => {
            console.log(response.data); // Success message or additional handling
            window.location.reload();
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
             
                <input type="text" name="name" value={task.name} onChange={handleChange}/>
                <FontAwesomeIcon className="icons" icon={faCirclePlus} onClick={()=>handleSubmit()} />
            </div>
            <div className="taskcontainer">{filteredArray.map((task)=>(
                <div className="task"><div>{task.name}</div><FontAwesomeIcon className="icons" icon={faPenToSquare} onClick={()=>handleUpdate(task._id)}/> <FontAwesomeIcon className="icons" icon={faTrash} onClick={()=>handleDelete(task._id)}/></div>
                
            ))}</div>
            


           
        </div>
    )
}
export default Tasks;