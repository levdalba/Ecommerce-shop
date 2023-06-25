import React from "react";
import { Switch, Route } from "react-router-dom";
import CartPage from "../components/Cart/Cartpage";

const Cart = () => {
  return (
    <Switch>
      <Route exact path="/cart" component={CartPage} />
    </Switch>
  );
};

export default Cart;
