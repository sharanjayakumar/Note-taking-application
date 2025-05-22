
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
import Viewusers from './Components/Admin/Viewusers';
import Dashboarduser from './Components/User/Dashboarduser';
import Useraddnotes from './Components/User/Addnote';
import Viewnote from './Components/User/Viewnote';
import Editnotes from './Components/Admin/Editnotes';
import ViewDetailednotes from './Components/Admin/ViewDetailednotes';
import Editnote from './Components/User/Editnote';
import Validatenotes from './Components/Admin/Validatenotes';
import Detailedview from './Components/User/Detailedview';
import Viewprofile from './Components/User/Viewprofile';
import Editprofile from './Components/User/Editprofile';




function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path='/admin-login' element={<Loginpage/>}></Route>
        <Route path='/admin-dashboard' element={<Dashboard/>} ></Route>
        <Route path='/admin-viewnote' element={<Viewnotes/>} ></Route>
        <Route path='/admin-addnote' element={<Addnotes/>} ></Route>
        <Route path='/admin-viewuser' element={<Viewusers/>} ></Route>
        <Route path='/navbar' element={<Navbar/>} ></Route>
        <Route path='/create_account' element={<Createacc/>}></Route>
        <Route path='/admin-editnote/:id' element={<Editnotes/>}></Route>
        <Route path='/admin-viewdetailnotes/:id' element={<ViewDetailednotes/>}></Route>
        <Route path='/forgot' element={<Forgotpass/>}></Route>
        <Route path='/dashboard' element={<Dashboarduser/>}></Route>
        <Route path='/useraddnote' element={<Useraddnotes/>}></Route>
        <Route path='/userviewnote' element={<Viewnote/>}></Route>
        <Route path='/usereditnote/:id' element={<Editnote></Editnote>}></Route>
        <Route path="/validatenotes" element={<Validatenotes/>}></Route>
        <Route path='/userdetailednote/:id' element={<Detailedview></Detailedview>}></Route>
        <Route path='/viewprofile' element={<Viewprofile></Viewprofile>}></Route>
        <Route path='/editprofile' element={<Editprofile></Editprofile>}></Route>
      </Routes>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
