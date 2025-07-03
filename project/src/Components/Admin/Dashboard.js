import React, { useEffect, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom'
import instance from '../../Utils/axios';
import { PieChart, Pie, Tooltip, Legend } from 'recharts'

function Dashboard() {
  const [data, setData] = useState([])
  const [categoryData, setCategoryData] = useState([]);

 useEffect(() => {
   console.log("useEffect running...");
  instance.get("/count")
    .then((res) => {
      console.log("Full Response:", res.data);
      
      setData(res.data);

      const categories = res.data.categorycount
        ? res.data.categorycount.map((item ,index)=> ({
            name: item._id,
            value: item.totalNotes,
            fill:colors[index]
          }))
        : [];

      console.log("Parsed Categories:", categories);
      setCategoryData(categories);
    })
    .catch((err) => {
      alert("No results found");
      console.log(err);
    });
}, []);
  const colors=["red","blue","green","yellow","orange","darkblue"]
  const data1 = [{ "name": "Adminnotes", "value": data.admincount, "fill": "blue" }, { "name": "Usernotes", "value": data.usercount, "fill": "green" }]
  return (
    <div className='Dashboard'>
      <div className='dash'>
        <ul>
          <br></br>
          <h2><b>DASHBOARD</b></h2>
          <br></br>
          <li class="dashb"><Link to={"/admin-viewnote"} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
            </svg> VIEW NOTES</Link></li>
          <li class="dashb"><Link to={"/admin-viewuser"} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg> VIEW USERS</Link></li>
          <li class="dashb"><Link to={"/admin-addnote"} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-journal-plus" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
            </svg> ADD NOTES</Link></li>
          <li class="dashb"><Link to={"/validatenotes"} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
            </svg> VALIDATE NOTES</Link></li>
          <li class="dashb"><Link to={"/admin-login"} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
              <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
            </svg> LOGOUT</Link></li>
        </ul>
      </div>
      <br></br>
      <div className="mx-auto" style={{ width: "60%" }}>
  <div className="row mx-auto" style={{ marginTop: "50px", gap: "20px" }}>
    <div className="col-lg-4 col-md-6 col-12 mb-3">
      <div className="card" style={{ width: "18rem", marginRight: "90px" }}>
        <div className="card-body">
          <center><h5 className="card-title">Notes</h5></center>
          <p className="card-text">Total notes : {data.totalcount}</p>
          <p className="card-text">Admin notes: {data.admincount} </p>
          <p className="card-text">User notes: {data.usercount} </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-12 mb-3">
      <div className="card" style={{ width: "18rem", marginLeft: "200px" }}>
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          <p className="card-text">No of users: {data.countofusers}</p>
        </div>
      </div>
    </div>
  </div>
 
  <div className="row mx-auto w-100" style={{ marginTop: "10px" }}>
    <div className="col-lg-6 col-md-12 mb-4 d-flex justify-content-center">
      <div style={{backgroundColor: "white", padding: "20px" ,width: "min-content"}}>
        <PieChart width={350} height={300}>
          <Pie
            data={data1}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
    <div className="col-lg-6 col-md-12 mb-4 d-flex justify-content-center">
      {categoryData.length > 0 ? (
        <div style={{ backgroundColor: "white", padding: "20px 40px 20px 20px " }}>
          <PieChart width={350} height={300}>
            <Pie
      data={categoryData}
      dataKey="value"
      nameKey="name"
      cx="50%" 
      cy="50%"
      outerRadius={80}
      label
      fill="#8884d8"
    ></Pie>
            <Tooltip />
            <Legend layout="horizontal" 
  verticalAlign="bottom" 
  align="center" width={250} />
          </PieChart>
        </div>
      ) : (
        <p style={{ color: "white" }}>Loading chart data...</p>
      )}
    </div>
  </div>
</div>
    </div>
  )
}

export default Dashboard