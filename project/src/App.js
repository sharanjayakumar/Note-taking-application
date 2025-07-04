
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
import Category from './Components/Admin/Category';
import Savenotes from './Components/User/Savenotes';
import Viewmynotes from './Components/User/Viewmynote';
import Otp from './Components/User/Otp';
import Resetpass from './Components/User/Resetpass';
import Categories from './Components/User/Categories';

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
        <Route path='/categoryuser/c' element={<Categories cat="C"/>} ></Route>
        <Route path='/categoryuser/java' element={<Categories cat="JAVA"/>} ></Route>
        <Route path='/categoryuser/python' element={<Categories cat="PYTHON"/>} ></Route>
        <Route path='/categoryuser/html' element={<Categories cat="HTML"/>} ></Route>
        <Route path='/categoryuser/css' element={<Categories cat="CSS"/>} ></Route>
        <Route path='/categoryuser/javascript' element={<Categories cat="JAVASCRIPT"/>} ></Route>
        <Route path='/category/c' element={<Category cat="C"></Category>}></Route>
        <Route path='/category/java' element={<Category cat="JAVA"></Category>}></Route>
        <Route path='/category/python' element={<Category cat="PYTHON"></Category>}></Route>
        <Route path='/category/html' element={<Category cat="HTML"></Category>}></Route>
        <Route path='/category/css' element={<Category cat="CSS"></Category>}></Route>
        <Route path='/category/javascript' element={<Category cat="JAVASCRIPT"></Category>}></Route>
        <Route path='/savednotes' element={<Savenotes/>}></Route>
        <Route path = '/viewmynote' element = {<Viewmynotes/>}></Route>
        <Route path = '/otp' element={<Otp/>}></Route>
        <Route path='/resetpwd' element={<Resetpass/>}></Route>
      </Routes>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
