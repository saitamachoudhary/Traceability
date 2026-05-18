import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

/**
 * RequireAuth — wraps any route that requires authentication.
 *
 * Usage in router config:
 *   <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
 *
 * If no token is present in sessionStorage (or the dev fallback in local dev),
 * the user is redirected to /login. The originally requested path is stashed
 * on location.state.from so Login can send the user back after a successful
 * sign-in.
 */
export default function RequireAuth({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return children;
}
