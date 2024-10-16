import { useState } from 'react'
import Signup from './pages/users/Signup';
import Login from './pages/users/login';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter as Router, Routes ,Route, } from 'react-router-dom';
import './App.css'
import HomePage from './pages/users/home';
import ProfilePage from './pages/users/profile';
import UserManagement from './pages/admin/user-management';
import ProductManagement from './pages/admin/product-management';
import Cart from './pages/cart/Cart';
import Protect from './protected/Protect';

function App() {
  return (
    <>
    <Provider store={store}>
    <Router>

       <Routes>
       <Route path="/signup" element={<Signup/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/' element={<HomePage/>} />
       <Route path='/profile' element={<Protect> <ProfilePage/> </Protect>} />
       <Route path='/admin/users' element={<UserManagement/>} />
       <Route path='/admin/products' element={<ProductManagement/>} />
       <Route path='/cart' element={<Protect> <Cart/> </Protect>} />
       

       </Routes>

    </Router>
    </Provider>
      
    </>
  )
}

export default App
