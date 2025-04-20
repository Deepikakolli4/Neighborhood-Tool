import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from '../components/Login'; 
import Signup from '../components/Signup'; 
import ToolList from '../components/ToolList'; 
import ToolCard from '../components/ToolCard'; 
import ReservationDashboard from '../components/ReservationDashboard'; 
import UserDashboard from '../components/UserDashboard'; 
import AdminDashboard from '../components/Dashboard'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';
import DaamageReport from '../components/DamageReport';
import ToolDetail from '../components/ToolDetail';
import Introduction from '../components/Introduction/introduction'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
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
