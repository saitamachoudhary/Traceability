import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

/**
 * ProtectedRoute — wraps any route that requires authentication.
 *
 * Usage in router config:
 *   <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 *
 * If no token is present in sessionStorage (or the dev fallback in local dev),
 * the user is redirected to /login automatically.
 */
export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
