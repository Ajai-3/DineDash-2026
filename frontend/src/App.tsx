import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RestaurantsPage from './pages/RestaurantsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Navigate to={APP_ROUTES.RESTAURANTS} replace />} />
        <Route path={APP_ROUTES.RESTAURANTS} element={<RestaurantsPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.RESTAURANTS} replace />} />
      </Routes>
    </Router>
  );
}

export default App;