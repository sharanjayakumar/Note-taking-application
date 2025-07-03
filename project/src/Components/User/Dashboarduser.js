import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import instance from '../../Utils/axios';
import { Pie,PieChart,Tooltip,Legend } from 'recharts';
import Nav from './Nav';
function Dashboard() {
  const [data, setData] = useState([]);
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
          setCategoryData(categories)
      })
      .catch((error) => {
        alert("No result found");
      });
  }, []);

  return (
    <div className='container-fluid Dashboard'>
      <Nav/>
      <br></br>
          <div className='row'>
            <div className='col-md-6 bg-black w-30'>
              <ul className='list-unstyled p-3'><br></br>
                <h4 className='text-center text-light'><b>DASHBOARD</b></h4><br></br>
                <li className="mb-3">
                  <Link to="/viewmynote" className="text-decoration-none text-light">
                    📄 VIEW MY NOTES
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/userviewnote" className="text-decoration-none text-light">
                     📄 VIEW NOTES
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/useraddnote" className="text-decoration-none text-light">
                    ➕ ADD NOTES
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/savednotes" className="text-decoration-none text-light">
                   📄 VIEW SAVED NOTES
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-md-6 mx-auto'>
              <div className="row mt-4 g-4 justify-content-center">
                <div className="col-12">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">Notes</h5>
                      <p>Total notes:{data.count}</p>
                      
                    </div>
                  </div>
                </div>
                <div className="col-12 mx-auto">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">Saved notes</h5>
                      <p>No of Saved notes:{data.savedcount}</p>
                    </div>
                  </div>
                </div>
              </div><br/>
              <div className="col-12">
              {categoryData.length > 0 ? (
                <div className="bg-white rounded shadow text-center" style={{width:'130%'}}><br></br>
                  <h6><b>Category Wise Note Count</b></h6>
                  <PieChart width={400} height={250}>
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
          <br></br>
        </div>
  );
}

export default Dashboard;
