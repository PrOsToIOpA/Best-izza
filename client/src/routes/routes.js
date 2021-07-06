import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Home, AuthPage,CartNo, CategoryPage, ItemPage, Profile, OrderPage } from '../pages'
import { Header, Footer, HeaderNo } from '../components';


export const useRoutes = isAuthenticated => {
   if(isAuthenticated) {
      return (
         <Switch>
            <div className="wrapper">
      <Header />
      <div className="content">
      <Route path="/" component={Home} exact />
        <Route path="/cart" component={CartNo} exact />
        <Route path="/AuthPage" component={AuthPage} exact />
        <Route path="/CategoryPage" component={CategoryPage} exact />
        <Route path="/ItemPage" component={ItemPage} exact />
        <Route path="/Profile" component={Profile} exact />
        <Route path="/Order" component={OrderPage} exact />
      </div>
      
      <Footer />
    </div>
    
    <Redirect to="/"/>
         </Switch>
      )
   }

   else {
      return (
         <Switch>
            <div className="wrapper">
      <HeaderNo />
      <div className="content">
      <Route path="/" component={Home} exact />
        <Route path="/cart" component={CartNo} exact />
        <Route path="/AuthPage" component={AuthPage} exact />
      </div>
    </div>
    <Redirect to="/"/>
         </Switch>
      )
   }
}