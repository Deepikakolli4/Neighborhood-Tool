import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AboutUs from './components/AboutUs/aboutus';
import AdminDashboard from './components/Dashboard/dashboard';
import Footer from './components/Footer/footer';
import Home from './components/Introduction/introduction';
import Login from './components/Login/login';
import Navbar from './components/Navigation/navbar';
import ProductSection from './components/Products/products';
import ReservationDashboard from './components/Reservation/reservation';
import Signup from './components/Sigup/signup';
import ToolDetail from './components/ToolDetail/toolDetail';
import ToolList from './components/ToolList/toollist';
import UserDashboard from './components/UserDashBoard/userdashboard';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/features" element={<ProductSection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tools" element={<ToolList />} />
              <Route path="/tools/:id" element={<ToolDetail />} />
              <Route
                path="/reservations"
                element={
                  <PrivateRoute>
                    <ReservationDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;