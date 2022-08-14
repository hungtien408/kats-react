import NotFound from 'components/not-found';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductList from './pages/product-list';

function Product() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={ProductList} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Product;
