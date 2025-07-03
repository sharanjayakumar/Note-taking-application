import React from 'react'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Nav from './Nav'
import instance from '../../Utils/axios'
import noteimage from '../../Assets/defaultcopy.jpg'
function Detailedview() {
    const { id } = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token");
        instance.get(`/userviewnote/${id}`)
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
            await instance.delete(`/userdeletenote/${id}`)
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
            await instance.post(`/savenote/${id}`,{})
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
                                    <center><img src={data.image ? "http://localhost:3000/noteuploads/" + data.image : noteimage}  className="mx-auto" width="200px" height="200px" name="image"  alt="..."></img></center>
                                    <center><h2 class="card-title">{data.title}</h2>
                                    <h5>{data.subtitle}</h5></center>
                                    <p class="card-text">{data.description}</p>
                                </div>
                            </div>
                        </div>


                </div>
            </div>
            <br></br>
            <center>
                {data.user? <Link class="btn btn-primary" to={`/usereditnote/${data._id}`} style={{marginLeft:"20px"}}>EDIT</Link>:<p></p>}
                {data.user? <button onClick={()=>userdelete(data._id)} className="btn btn-primary" to='/usereditnote' style={{marginLeft:"20px"}}>DELETE</button>:<p></p>}
               <button class="btn btn-primary" style={{marginLeft:"20px"}} onClick={()=>savednote(data._id)} >SAVE</button>
                <Link to='/userviewnote' class="btn btn-primary" style={{marginLeft:"20px"}}>BACK</Link>
            </center> 
        </div>
  )
}

export default Detailedview