import React,{useState, useEffect} from 'react'

import {io} from 'socket.io-client'


const socket = io("http://localhost:5000");


 



const Chatglobal = ({location,username},) => {
    const  [msgs , setMsgs] = useState([])
    const [Msg,setMsg] = useState('')
    function SaveDataToLocalStorage(data)
    {
        var a = [];
        // Parse the serialized data back into an aray of objects
        a = JSON.parse(localStorage.getItem('msgList')) || [];
        // Push the new data (whether it be an object or anything else) onto the array
        a.push(data);
        // Alert the array value
    
        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('msgList', JSON.stringify(a));
    }

    socket.emit('welcome','zaeazeae')


    
    useEffect(() => {

       socket.on('MsgFromServer', msg =>{
           console.log(msg)
           SaveDataToLocalStorage(msg)
       })

   
       
    }, [socket])
    

    
    const chatInputhHander = (e)=>{
        setMsg(e.target.value)
    }

 

    const chatHandler = (e)=>{
        e.preventDefault()
        setTimeout(() => {
            const varMsgs = JSON.parse(localStorage.getItem('msgList')) || [];
            setMsgs(varMsgs) 
        }, 500);
            socket.emit('MsgToServer', `${username.name}: ${Msg}`)
            console.log(Array)

    }

      
    
  

    return (
        <div className="col-sm-3" id="chat">


        <ul>
          
            {
     msgs.map(msg => {
        return <li id="listmsg" key={msg}>{msg}</li>
     })
   }
          </ul>

          <div id="sendMessageBox">
            <form action="" onSubmit={(e)=>chatHandler(e)}>
              <input  type="text" onChange= {(e)=>chatInputhHander(e)} value={Msg} placeholder="Enter your message" />
    
           <div className="row">
             <div className="col-sm-6">
              <i className="fa fa-circle" id="dotCercle" ></i> &nbsp; Online: 100
             </div>

             <div className="col-sm-6">
              <input type="submit" className="btn btn-success" />
            </div>
           </div>
           </form>
          </div>
          
    </div>
    )
}

export default Chatglobal
