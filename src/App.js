// General Imports
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// Pages Imports
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MyJobApplications from './pages/MyJobApplications/MyJobApplications';
import Application from './pages/Application/Application';
import MyDashboard from './pages/MyDashboard/MyDashboard';

// Component Imports
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

// Util Imports
import PrivateRoute from './utils/PrivateRoute';

function App() {
    return (
        <div className="app-page">
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <MyDashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/MyJobApplications"
                    element={
                        <PrivateRoute>
                            <MyJobApplications />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/applications/:jobAppId/"
                    element={
                        <PrivateRoute>
                            <Application />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/MyDashboard"
                    element={
                        <PrivateRoute>
                            <MyDashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
