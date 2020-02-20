import * as React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Customers from '../pages/customers/Customers';

const NotFound = React.lazy(()=>import('../pages/404/404'));

export const AppRouter = () => {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter> 
          <Link to="/">Home</Link>
          <Link to="/customers">Customers</Link>
          {/*Switch component renders first match on route, if not, it renders not found page.*/}
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route component={Customers} path="/customers" exact/>
            <Route component={NotFound} exact/>
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
};