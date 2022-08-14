import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import AdminLayoutRoute from './components/layout/admin-layout';
import DefaultLayoutRoute from './components/layout/default-layout';
import NotFound from './components/not-found';
import { ADMIN_ROUTES, ROUTES } from './constants/route';

function App() {
  const renderAdminRoutes = () => {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map((route) =>
      route.items != null && route.items.length > 0 ? (
        route.items.map((sub) =>
          sub.items != null && sub.items.length > 0 ? (
            sub.items.map((s2) => (
              <AdminLayoutRoute
                key={s2.path}
                path={s2.path}
                component={s2.component}
                exact={s2.exact}
                name={s2.name}
              />
            ))
          ) : (
            <AdminLayoutRoute
              key={sub.path}
              path={sub.path}
              component={sub.component}
              exact={sub.exact}
              name={sub.name}
            />
          )
        )
      ) : (
        <AdminLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      )
    );
    return xhtml;
  };

  const renderDefaultRoutes = () => {
    let xhtml = null;
    xhtml = ROUTES.map((route) => (
      <DefaultLayoutRoute
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    ));
    return xhtml;
  };

  const renderRoutes = () => {
    let xhtml = null;
    xhtml = (
      <Switch>
        {renderAdminRoutes()}
        {renderDefaultRoutes()}
        <Route component={NotFound} />
      </Switch>
    );
    return xhtml;
  };

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <BrowserRouter>{renderRoutes()}</BrowserRouter>
    </Suspense>
  );
}

export default App;
