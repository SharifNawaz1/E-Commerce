import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Product from './components/Products';
import Update from './components/Update'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav /> 
      <Routes>
        <Route element={<PrivateRoute />}>
        <Route path='/' element={<Product />}/>
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/update/:id' element={<Update />}/>
        <Route path='/logout' element={<h1>Product Logout Component</h1>}/>
        <Route path='/profile' element={<h1>Product Profile Component</h1>}/>
        </Route>
        
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
