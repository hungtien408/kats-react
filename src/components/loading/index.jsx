import { makeStyles } from '@material-ui/core';
import ReactLoading from 'react-loading';

const useStyles = makeStyles(() => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
}));

function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <ReactLoading type={'bubbles'} color={'#000'} height={'15%'} width={'15%'} />
    </div>
  );
}

export default Loading;
