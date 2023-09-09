import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';

//components
import { NavigationBar } from './components/Navbar';

//pages
import { RegisterPage } from './pages/Register';
import { LoginPage } from './pages/Login';
import { HomePage } from './pages/Home';
import { ListingPage } from './pages/List';
import { Details } from './pages/Details';
import { ViewOrders } from './pages/ViewOrders';
import { ViewOrderDetails } from './pages/ViewOrderDetails';
import { Auth } from './pages/Auth';

function App() {
  return (
    <div>
    <NavigationBar/>
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/auth' element={<Auth/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/book/list' element={<ListingPage/>} />
      <Route path='/book/view/:bookId' element={<Details/>} />
      <Route path='/book/orders' element={<ViewOrders/>} />
      <Route path='/book/order/:bookId' element={<ViewOrderDetails/>} />
      
    </Routes>
    </div>
  );
}

export default App;
