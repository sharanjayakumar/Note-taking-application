
import './App.css';
import Dashboard from './Components/Admin/Dashboard';
import Loginpage from './Components/Admin/Loginpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Viewnotes from './Components/Admin/Viewnotes';
import Addnotes from './Components/Admin/Addnotes';
import Forgotpass from './Components/User/Forgotpass';
import Createacc from './Components/User/Createacc';
import Login from './Components/User/Login';
import Navbar from './Components/Admin/Navbar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path='/admin-login' element={<Loginpage/>}></Route>
        <Route path='/admin-dashboard' element={<Dashboard/>} ></Route>
        <Route path='/viewnote' element={<Viewnotes/>} ></Route>
        <Route path='/addnote' element={<Addnotes/>} ></Route>
        <Route path='/navbar' element={<Navbar/>} ></Route>
        <Route path='/create_account' element={<Createacc/>}></Route>
        <Route path='/forgot' element={<Forgotpass/>}></Route>
      </Routes>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
