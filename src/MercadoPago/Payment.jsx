import React from "react";
import PaymentForm from "./PaymentForm";
import PaymentResult from "./PaymentResult";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Payment = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/payment" component={PaymentForm} />
        <Route path="/payment/result" component={PaymentResult} />
      </Switch>
    </Router>
  );
};

export default Payment;
