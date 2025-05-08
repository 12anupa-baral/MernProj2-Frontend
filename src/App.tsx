
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Register from './pages/user/Register'
import { Provider } from 'react-redux'
import store from './store/store'
import Home from './pages/home/Home'
import Login from './pages/user/Login'
import Product from './pages/product/Product'
import SingleProduct from './pages/single-product/SingleProduct'
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import MainLayout from "./globals/components/MainLayout";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contact/ContactUs";
import PageNotFound from "./pages/PageNotFound";
import MyOrders from "./pages/orders/MyOrders";
import OrderDetails from "./pages/orderdetails/OrderDetails";
import Admindashboard from "./pages/admin/AdminLayout";
import Categories from "./pages/admin/categories/Categories";
import Index from "./pages/admin/AdminLayout";
import AdminStats from "./pages/admin/stats/AdminStats";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/myorder/:id" element={<OrderDetails />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route element={<Admindashboard />}>
            <Route path="/admin" element={<AdminStats />} />
            <Route path="/admin/categories" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App
