// Frontend/src/App.jsx - WITH STORE ON/OFF FEATURE

import React from 'react';
import AdminPromoSMS from './Components/AdminPromoSMS';
import { Routes, Route } from 'react-router-dom';
import ServerWakeup from './Components/ServerWakeup';
import { CartProvider } from './Components/CartContext';
import { StoreProvider } from './Components/StoreContext';
import Navbar from './Components/Navbar';
import StoreBanner from './Components/StoreBanner';
import FirstContainer from './Components/FirstContainer';
import DairyBreadEggs from './Components/DairyBreadEggs';
import AttaRiceDal from './Components/AttaRiceDal';
import MasalaOil from './Components/MasalaOil';
import PetCare from './Components/PetCare';
import BabyCare from './Components/BabyCare';
import Pharmacy from './Components/Pharmacy';
import Cart from './Components/Cart';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import Checkout from './Components/Checkout';
import MyOrders from './Components/MyOrders';
import OrderSuccess from './Components/OrderSuccess';
import AdminDashboard from './Components/AdminDashboard';
import AdminOrders from './Components/AdminOrders';
import AdminOrderDetail from './Components/AdminOrderDetail';
import JagatStore from './Components/JagatStore';
import SearchResults from './Components/SearchResults';
import SaucesSpreads from './Components/SaucesSpreads';
import SnacksMunchies from './Components/SnacksMunchies';
import PersonalCare from './Components/PersonalCare';
import SweetTooth from './Components/SweetTooth';
import BakeryBiscuits from './Components/BakeryBiscuits';
import CleaningEssentials from './Components/CleaningEssentials';
import OrganicHealthyLiving from './Components/OrganicHealthyLiving';
import ColdDrinksJuices from './Components/ColdDrinksJuices';
import BreakfastInstantFoods from './Components/BreakfastInstantFoods';
import OrderDetails from './Components/OrderDetails';
import HomeOffices from './Components/HomeOffices';
import WhatsAppButton from './Components/WhatsAppButton';
import ScrollToTop from './Components/ScrollToTop';
import AdminProducts from './Components/AdminProducts';
import AdminAddProduct from './Components/AdminAddProduct';
import PaanCorner from './Components/PaanCorner';
import CheckoutGuard from './Components/CheckoutGuard';
import NewYearPopup from './Components/NewYearPopup';

function App() {
  return (
    <ServerWakeup>
      <StoreProvider>
        <CartProvider>
          {/* Scroll to top on page change */}
          <ScrollToTop />
         
          <NewYearPopup />  {/* ✅ Add this line */}
          
          {/* Navbar */}
          <Navbar />
          
          {/* 🏪 Store Closed Banner - Shows when store is closed */}
          <StoreBanner />
          
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<FirstContainer />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/promo-sms" element={<AdminPromoSMS />} />
            
            {/* Category Pages */}
            <Route path="/DairyBreadEggs" element={<DairyBreadEggs />} />
            <Route path="/AttaRiceDal" element={<AttaRiceDal />} />
            <Route path="/MasalaOil" element={<MasalaOil />} />
            <Route path="/PetCare" element={<PetCare />} />
            <Route path="/BabyCare" element={<BabyCare />} />
            <Route path="/JagatStore" element={<JagatStore />} />
            <Route path="/SaucesSpreads" element={<SaucesSpreads />} />
            <Route path="/Pharmacy" element={<Pharmacy />} />
            <Route path="/Checkout" element={<CheckoutGuard><Checkout /></CheckoutGuard>} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/SnacksMunchies" element={<SnacksMunchies />} />
            <Route path="/PersonalCare" element={<PersonalCare />} />
            <Route path="/SweetTooth" element={<SweetTooth />} />
            <Route path="/BakeryBiscuits" element={<BakeryBiscuits />} />
            <Route path="/CleaningEssentials" element={<CleaningEssentials />} />
            <Route path="/OrganicHealthyLiving" element={<OrganicHealthyLiving />} />
            <Route path="/ColdDrinksJuices" element={<ColdDrinksJuices />} />
            <Route path="/BreakfastInstantFoods" element={<BreakfastInstantFoods />} />
            <Route path="/HomeOffices" element={<HomeOffices />} />
            <Route path="/order-details/:orderId" element={<OrderDetails />} />
            <Route path="/PaanCorner" element={<PaanCorner />} />
            
            {/* Orders */}
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/search" element={<SearchResults />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:orderId" element={<AdminOrderDetail />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            
            {/* Cart */}
            <Route path="/Cart" element={<Cart />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
          
          {/* WhatsApp Button */}
          <WhatsAppButton />
        </CartProvider>
      </StoreProvider>
    </ServerWakeup>
  );
}

export default App;