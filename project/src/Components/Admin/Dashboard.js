import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Tooltip, Legend } from 'recharts'
import instance from '../../Utils/axios'

function Dashboard() {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const colors = ["red", "blue", "green", "brown", "orange", "darkblue"];
  const data1 = [
    { name: "Adminnotes", value: data.admincount, fill: "blue" },
    { name: "Usernotes", value: data.usercount, fill: "green" }
  ];

  useEffect(() => {
    instance.get("/count")
      .then((res) => {
        setData(res.data);
        const categories = res.data.categorycount
          ? res.data.categorycount.map((item, index) => ({
              name: item._id,
              value: item.totalNotes,
              fill: colors[index]
            }))
          : [];
        setCategoryData(categories);
      })
      .catch((err) => {
        alert("No results found");
        console.log(err);
      });
  }, []);

  return (
    <div className='container-fluid Dashboard'>
      <div className='row'>
        <div className='col-md-3 bg-black'>
          <ul className='list-unstyled p-3'><br></br>
            <h4 className='text-center text-light'><b>DASHBOARD</b></h4><br></br>
            <li className="mb-3">
              <Link to="/admin-viewnote" className="text-decoration-none text-light">
                📄 VIEW NOTES
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/admin-viewuser" className="text-decoration-none text-light">
                👥 VIEW USERS
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/admin-addnote" className="text-decoration-none text-light">
                ➕ ADD NOTES
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/validatenotes" className="text-decoration-none text-light">
                ✅ VALIDATE NOTES
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/admin-login" className="text-decoration-none text-light">
                🚪 LOGOUT
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-md-9'>
          <div className="row mt-4 g-4 justify-content-center">
            <div className="col-md-5">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Notes</h5>
                  <p>Total notes: {data.totalcount}</p>
                  <p>Admin notes: {data.admincount}</p>
                  <p>User notes: {data.usercount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Users</h5>
                  <p>No of users: {data.countofusers}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 g-4 justify-content-center">
            <div className="col-lg-6 col-12">
              <div className="bg-white rounded shadow text-center"><br></br>
                <h6><b>Admin Notes vs User Notes</b></h6>
                <PieChart width={320} height={250}>
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
            <div className="col-lg-6 col-12">
              {categoryData.length > 0 ? (
                <div className="bg-white  rounded shadow text-center" style={{paddingRight:"105px",paddingLeft:"20px"}}><br></br>
                  <h6><b>Category Wise Note Count</b></h6>
                  <PieChart width={370} height={250}>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="40%"
                      cy="50%"
                      outerRadius={80}
                      label
                    />
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </div>
              ) : (
                <p className="text-muted text-center">Loading chart data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default Dashboard;
