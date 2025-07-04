import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import instance from '../../Utils/axios';
import { Pie, PieChart, Tooltip, Legend } from 'recharts';
import Nav from './Nav';

function Dashboard() {
  const [data, setData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const colors = ["red", "blue", "green", "yellow", "orange", "darkblue"];

  useEffect(() => {
    instance.get("/usercount")
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
      .catch(() => {
        alert("No result found");
      });
  }, []);

  return (
    <div className="Dashboard"style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%" }}>
        <Nav />
      </div>
      <div className="container-fluid flex-grow-1" style={{ padding: 0 }}>
        <div className="row m-0 h-100 flex-grow-1" >
          <div className="col-md-3 bg-dark text-white p-3 md-h-100">
            <h4 className='text-center'><b>DASHBOARD</b></h4><br></br>
            <ul className='list-unstyled'>
              <li className="mb-3"><Link to="/viewmynote" className="text-decoration-none text-light">📄 VIEW MY NOTES</Link></li>
              <li className="mb-3"><Link to="/userviewnote" className="text-decoration-none text-light">📄 VIEW NOTES</Link></li>
              <li className="mb-3"><Link to="/useraddnote" className="text-decoration-none text-light">➕ ADD NOTES</Link></li>
              <li className="mb-3"><Link to="/savednotes" className="text-decoration-none text-light">📄 VIEW SAVED NOTES</Link></li>
            </ul>
          </div>
          <div className="col-md-9 p-4 h-100">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Notes</h5>
                    <p>Total notes: {data.count}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Saved notes</h5>
                    <p>No of Saved notes: {data.savedcount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              {categoryData.length > 0 ? (
                <div className="bg-white rounded shadow p-3 text-center"  style={{width: '100%',maxWidth: '600px',  minWidth: '350px' }}>
                  <h6><b>Category Wise Note Count</b></h6>
                  <PieChart width={400} height={250}>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
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
    </div>
  );
}

export default Dashboard;
