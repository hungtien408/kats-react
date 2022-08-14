import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(() => ({
  pager: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginTop: '5px',
    paddingBottom: '5px',
  },
  description: {
    paddingLeft: '5px',
    paddingTop: '5px',
  },
}));

Pager.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  limit: PropTypes.number,
  changePage: PropTypes.func,
};

Pager.defaultProps = {
  page: 0,
  total: 0,
  limit: 0,
  changePage: null,
};

function Pager({ page, total, limit, changePage }) {
  const classes = useStyles();

  const onPageChange = (_e, page) => {
    if (!changePage) return;
    changePage(page);
  };

  return (
    <Box className={classes.pager}>
      <span className={classes.description}>Tổng cộng {total} bản ghi </span>
      <Pagination
        shape="rounded"
        count={Math.ceil(total / limit)}
        page={page}
        onChange={onPageChange}
      />
    </Box>
  );
}

export default Pager;
