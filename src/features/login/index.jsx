import { Card, CardContent, CardHeader } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AUTHORIZATION_EXPIRY, AUTHORIZATION_KEY } from '../../constants/global';
import LoginForm from './components/login-form';
import { login } from './login-slice';
import './styles.scss';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitLogin = async (values) => {
    try {
      let action = login({ ...values, deviceId: '' });
      const resultAction = await dispatch(action);
      const { AccessToken } = unwrapResult(resultAction);
      localStorage.setItem(AUTHORIZATION_KEY, AccessToken.Token);
      localStorage.setItem(AUTHORIZATION_EXPIRY, AccessToken.ExpiresIn);
      history.push('/');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div className="background">
      <div className="login-form">
        <Card>
          <CardHeader title={'CRUD'} className="text-center"></CardHeader>
          <CardContent className="pt-0 pb-2">
            <LoginForm onSubmit={handleSubmitLogin} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
