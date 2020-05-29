import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Order from './pages/Order';
import OrderEdit from './pages/Order/Edit';
import Deliveryman from './pages/Deliveryman';
import DeliverymanEdit from './pages/Deliveryman/Edit';
import Recipients from './pages/Recipients';
import RecipientsEdit from './pages/Recipients/Edit';
import Problems from './pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/encomendas" exact component={Order} />
      <Route path="/encomendas/editar/:id?" component={OrderEdit} />

      <Route path="/entregadores" exact component={Deliveryman} />
      <Route path="/entregadores/editar/:id?" component={DeliverymanEdit} />

      <Route path="/destinatarios" exact component={Recipients} />
      <Route path="/destinatarios/editar/:id?" component={RecipientsEdit} />

      <Route path="/problemas" component={Problems} />
    </Switch>
  );
}
