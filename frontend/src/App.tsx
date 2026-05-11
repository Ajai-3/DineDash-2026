import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RestaurantsPage from './pages/RestaurantsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <div className="dark min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <main>
          <Routes>
            <Route path={APP_ROUTES.HOME} element={<Navigate to={APP_ROUTES.RESTAURANTS} replace />} />
            <Route path={APP_ROUTES.RESTAURANTS} element={<RestaurantsPage />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<Navigate to={APP_ROUTES.RESTAURANTS} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;