import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import PageMainContent from './page-main-content';
import PageMainHeader from './page-main-header';

const useStyles = makeStyles(() => ({
  root: {
    border: '1px solid #dddbda',
    borderRadius: '5px',
    backgroundColor: '#f3f2f2',
  },
}));

PageMain.propTypes = {
  feature: PropTypes.string.isRequired,
  icon: PropTypes.string,
  page: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.array,
  handleSearchEnter: PropTypes.func,
  handleRefresh: PropTypes.func,
  handleFilter: PropTypes.func,
  handleExport: PropTypes.func,
  handleImport: PropTypes.func,
  handleCreate: PropTypes.func,
};

PageMain.defaultProps = {
  feature: '',
  icon: 'assignment',
  page: '',
  title: '',
  children: null,
  handleSearchEnter: null,
  handleRefresh: null,
  handleFilter: null,
  handleExport: null,
  handleImport: null,
  handleCreate: null,
};

function PageMain(props) {
  const classes = useStyles();
  const {
    feature,
    icon,
    page,
    title,
    children,
    handleSearchEnter,
    handleRefresh,
    handleFilter,
    handleExport,
    handleImport,
    handleCreate,
  } = props;

  return (
    <div className={classes.root}>
      <PageMainHeader
        feature={feature}
        icon={icon}
        page={page}
        title={title}
        handleSearchEnter={handleSearchEnter}
        handleRefresh={handleRefresh}
        handleFilter={handleFilter}
        handleExport={handleExport}
        handleImport={handleImport}
        handleCreate={handleCreate}
      />
      <PageMainContent>{children}</PageMainContent>
    </div>
  );
}

export default PageMain;
