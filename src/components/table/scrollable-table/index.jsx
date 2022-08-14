import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'auto',
    backgroundColor: '#fff',
    width: '100%',
  },
}));

ScrollableTable.propTypes = {
  children: PropTypes.element,
};

ScrollableTable.defaultProps = {
  children: null,
};

function ScrollableTable(props) {
  const [contentHeight, setContentHeight] = useState(300);
  const [adjustHeight] = useState(0);
  const classes = useStyles();
  const { children } = props;

  const setDataTableScrollableHeight = () => {
    const bannerHeight = document.getElementsByTagName('header')[0].clientHeight;
    const pageDetails = document.getElementsByTagName('kats-page-detail-header');
    const pageMain = document.getElementsByTagName('kats-page-main-header');
    const headerHeight =
      pageDetails.length > 0 && pageMain.length === 0
        ? pageDetails[0].getElementsByClassName('summary')[0].clientHeight
        : 0;
    const gridHeight =
      window.innerHeight -
      (bannerHeight > 0 ? bannerHeight : 54) -
      (headerHeight > 0 ? headerHeight : 85) -
      60 - // pagination
      adjustHeight;
    const contentHeight = (gridHeight > 300 ? gridHeight : 300).toString();
    setContentHeight(contentHeight);
  };

  useEffect(() => {
    setDataTableScrollableHeight();
  });

  return (
    <div className={classes.root} style={{ height: `${contentHeight.toString()}px` }}>
      {children}
    </div>
  );
}

export default ScrollableTable;
