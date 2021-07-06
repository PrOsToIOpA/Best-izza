import React from 'react';
import 'materialize-css'

import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes/routes';


function App() {
  
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{token, login, logout, userId}}>
    {routes}
    
    </AuthContext.Provider>
  );
}
/*<Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact /> */

export default App;
