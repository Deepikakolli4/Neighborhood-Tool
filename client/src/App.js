import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from '../components/Login/login';
import Signup from '../components/Signup/signup';
import ToolList from '../components/ToolList/toollist';
import ToolDetail from '../components/ToolDetail/toolDetail';
import ReservationDashboard from '../components/Reservation/reservation';
import UserDashboard from '../components/UserDashboard/userdashboard';
import AdminDashboard from '../components/Dashboard/dashboard';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import AboutUs from '../components/AboutUs/aboutus';
import DamageReport from '../components/DamageReport/damage';
import Introduction from '../components/Introduction/introduction';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; // Updated path
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Introduction />} />
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
