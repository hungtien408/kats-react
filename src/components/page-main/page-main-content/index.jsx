import PropTypes from 'prop-types';
import React from 'react';

PageMainContent.propTypes = {
  children: PropTypes.array,
};

PageMainContent.defaultProps = {
  children: null,
};

function PageMainContent(props) {
  const { children } = props;

  return <div className="page-main-content d-block">{children}</div>;
}

export default PageMainContent;
