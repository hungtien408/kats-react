import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AUTHORIZATION_KEY } from '../../../constants/global';
import Content from './content';
import './styles.scss';

AdminLayout.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  name: PropTypes.string,
};

AdminLayout.defaultProps = {
  path: '',
  exact: true,
  name: '',
  component: {},
};

function AdminLayout(props) {
  const { component: NewComponent, ...remainProps } = props;
  const token = localStorage.getItem(AUTHORIZATION_KEY);

  return (
    <Route
      {...remainProps}
      render={(routeProps) =>
        token ? (
          <Content {...remainProps}>
            <NewComponent {...routeProps} />
          </Content>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default AdminLayout;
