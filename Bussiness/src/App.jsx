import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './Components/CartContext';
import Navbar from './Components/Navbar';
import FirstContainer from './Components/FirstContainer';  // ← Home page!
import DairyBreadEggs from './Components/DairyBreadEggs';
import AttaRiceDal from './Components/AttaRiceDal';
import MasalaOil from './Components/MasalaOil';
import PetCare from './Components/PetCare';
import BabyCare from './Components/BabyCare';
import PaanCorner from './Components/PaanCorner';
import Pharmacy from './Components/Pharmacy';
import Cart from './Components/Cart';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';
import Checkout from './Components/Checkout';
import MyOrders from './Components/MyOrders';
import OrderSuccess from './Components/OrderSuccess';
import AdminDashboard from './Components/AdminDashboard';
import AdminOrders from './Components/AdminOrders';
import OrderDetails from './Components/OrderDetails';
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
import ColdDrinksJuices from './Components/ColdDrinksJuices.jsx';
import BreakfastInstantFoods from './Components/BreakfastInstantFoods';
import HomeOffices from './Components/HomeOffices';
function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        {/* Home Page - Shows FirstContainer with categories */}
        <Route path="/" element={<FirstContainer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Category Pages */}
        <Route path="/DairyBreadEggs" element={<DairyBreadEggs />} />
        <Route path="/AttaRiceDal" element={<AttaRiceDal />} />
        <Route path="/MasalaOil" element={<MasalaOil />} />
        <Route path="/PetCare" element={<PetCare />} />
        <Route path="/BabyCare" element={<BabyCare />} />
        <Route path="/PaanCorner" element={<PaanCorner />} />
        <Route path="/JagatStore" element={<JagatStore />} />
          <Route path="/SaucesSpreads" element={<SaucesSpreads />} />
        <Route path="/Pharmacy" element={<Pharmacy />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/SnacksMunchies" element={<SnacksMunchies />} />
        <Route path="/PersonalCare" element={<PersonalCare />} />
        <Route path="/SweetTooth" element={<SweetTooth />} />
        <Route path="/BakeryBiscuits" element={<BakeryBiscuits />} />
        <Route path="/CleaningEssentials" element={<CleaningEssentials />} />
        <Route path="/OrganicHealthyLiving" element={<OrganicHealthyLiving />} />
        <Route path="/ColdDrinksJuices" element={<ColdDrinksJuices />} />
        <Route path="/BreakfastInstantFoods" element={<BreakfastInstantFoods />} />
        <Route path="/HomeOffices" element={<HomeOffices />} />

          
        <Route path="/orders" element={<MyOrders />} />
<Route path="/my-orders" element={<MyOrders />} />
<Route path="/search" element={<SearchResults />} />
        
        {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:orderId" element={<AdminOrderDetail />} />
        {/* Cart */}
        <Route path="/Cart" element={<Cart />} />
        
        {/* Auth */}
        <Route path="/Login" element={<Login />} />
        
      </Routes>
    </CartProvider>
  );
}

export default App;