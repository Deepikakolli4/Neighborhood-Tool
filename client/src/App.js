import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Introduction/introduction';
import Login from './components/Login/login';
import Signup from './components/Sigup/signup'; // Note: Keeping your path, but consider renaming folder to 'Signup'
import ToolList from './components/ToolList/toollist';
import ToolDetail from './components/ToolDetail/toolDetail';
import ReservationDashboard from './components/Reservation/reservation';
import AdminDashboard from './components/Dashboard/dashboard';
import Navbar from './components/Navigation/navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
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
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;