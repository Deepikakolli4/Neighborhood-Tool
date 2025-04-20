import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from '../components/Introduction/introduction'; // Corrected path
import Login from './components/'; // Corrected path
import Signup from '../components/Sigup/signup'; // Corrected path
import ToolList from '../components/ToolList/toollist'; // Corrected path
import ToolDetail from '../components/ToolDetail/toolDetail'; // Corrected path
import ReservationDashboard from '../components/Reservation/reservation'; // Corrected path
import UserDashboard from '../components/UserDashBoard/userdashboard'; // Corrected path
import AdminDashboard from '../components/Dashboard/dashboard'; // Corrected path
import Navbar from '../components/Navigation/navbar'; // Corrected path
import Footer from '../components/Footer/footer'; // Corrected path
import PrivateRoute from './components/PrivateRoute'; // Ensure this file exists
import AdminRoute from './components/AdminRoute'; // Ensure this file exists
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;