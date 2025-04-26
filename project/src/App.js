
import './App.css';
import Dashboard from './Components/Admin/Dashboard';
import Loginpage from './Components/Admin/Loginpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Viewnotes from './Components/Admin/Viewnotes';
import Addnotes from './Components/Admin/Addnotes';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Loginpage/>}></Route>
        <Route path='/admin-dashboard' element={<Dashboard/>} ></Route>
        <Route path='/viewnote' element={<Viewnotes/>} ></Route>
        <Route path='/addnote' element={<Addnotes/>} ></Route>

      </Routes>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
