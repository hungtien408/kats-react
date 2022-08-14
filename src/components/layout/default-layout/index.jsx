import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import './styles.scss';

DefaultLayout.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  name: PropTypes.string,
};

DefaultLayout.defaultProps = {
  path: '',
  exact: true,
  name: '',
};

function DefaultLayout(props) {
  const { component: NewComponent, ...remainProps } = props;
  return <Route {...remainProps} render={(routeProps) => <NewComponent {...routeProps} />} />;
}

export default DefaultLayout;
