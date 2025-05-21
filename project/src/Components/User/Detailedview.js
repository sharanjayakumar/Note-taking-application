import React from 'react'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Nav from './Nav'
function Detailedview() {
    const { id } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/userviewnote/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setData(res.data);
                console.log("Notes fetched:", res.data);
            })
            .catch((err) => {
                console.log("Error fetching notes:", err);
            });
    }, []);
        const userdelete = async(id)=>{
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if(! confirm)
        {return;}
        try{
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/userdeletenote/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            alert("Note deleted successfully")
        }
        catch(err){
            console.log(err)
            alert("failed to delete note")
        }
    }
    const savednote=async(id)=>{
        try{
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:3000/savenote/${id}`,{},{headers:{Authorization:`Bearer ${token}`}})
            alert("Note saved successfully")
        }
        catch(err){
            console.log(err)
            alert("failed to save note")
        }
         
    }
  return (
    <div>
        <Nav/>
        <div className='container'>
            <center><h1>DETAILED NOTE</h1></center><br></br>
                <div class="row">
                        <div className="col-lg-12 col-md-6 col-12 mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <h2 class="card-title">{data.title}</h2>
                                    <h5>{data.subtitle}</h5>
                                    <p class="card-text">{data.description}</p>
                                </div>
                            </div>
                        </div>


                </div>
            </div>
            <br></br>
            <center>
                <Link to='/userviewnote' class="btn btn-primary">BACK</Link>
                <Link class="btn btn-primary" to={`/usereditnote/${data._id}`} style={{marginLeft:"20px"}}>EDIT</Link>
                <button onClick={()=>userdelete(data._id)} className="btn btn-primary" to='/usereditnote' style={{marginLeft:"20px"}}>DELETE</button>
               <button class="btn btn-primary" style={{marginLeft:"20px"}} onClick={()=>savednote(data._id)} >SAVE</button>
            </center> 
        </div>
  )
}

export default Detailedview