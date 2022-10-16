import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import {
  AUTHORIZATION_EXPIRY,
  AUTHORIZATION_KEY,
  AUTHORIZATION_TIME,
} from '../../../constants/global';
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
  const expiry = localStorage.getItem(AUTHORIZATION_EXPIRY);
  const time = localStorage.getItem(AUTHORIZATION_TIME);
  const currDate = new Date().getTime();
  const miliseconds = Math.abs(currDate - time);
  const isActive = miliseconds < expiry;

  return (
    <Route
      {...remainProps}
      render={(routeProps) =>
        token && isActive ? (
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
