import NotFound from 'components/not-found';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import OrderList from './pages/order-list';

function Order() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={OrderList} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Order;
