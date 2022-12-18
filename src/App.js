import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Route , Link, Routes, Switch} from 'react-router-dom'
import Homescreen from './Screens/Homescreen';
import Bookingscreen from './Screens/Bookingscreen';
import Registerscreen from './Screens/Registerscreen';
import Loginscreen from './Screens/Loginscreen';
import Profilescreen from './Screens/Profilescreen';
import Adminscreen from './Screens/Adminscreen';
import Landingscreen from './Screens/Landingscreen';


function App() {
  return (
    <div className="App">
     <Navbar/>
     <BrowserRouter>
     <Switch>
      <Route  path ="/home" exact component={Homescreen}></Route>
      <Route path='/book/:roomid/:fromdate/:todate' exact component={Bookingscreen}></Route>
      <Route path='/register' exact component={Registerscreen}></Route>
      <Route path='/login' exact component={Loginscreen}></Route>
      <Route path='/profile' exact component={Profilescreen}></Route>
      <Route path='/admin' exact component = {Adminscreen}></Route>
      <Route path='/' exact component = {Landingscreen}></Route>
     </Switch>
     </BrowserRouter>
    </div>
  );
}
 
export default App;
 