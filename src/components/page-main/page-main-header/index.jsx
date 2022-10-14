import { Button, Grid, Icon, makeStyles } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import LocalBarOutlinedIcon from '@material-ui/icons/LocalBarOutlined';
import InputField from 'components/form-controls/input-field';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    padding: 5,
    backgroundColor: '#f3f2f2',
    '& span': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    '& .module': {
      display: 'block',
      fontSize: '0.75rem',
    },
  },
  headerIcon: {
    display: 'inline-block',
    fontSize: 36,
    marginRight: 10,
    verticalAlign: -12,
  },
  headerTitle: {
    display: 'block',
    fontSize: '1.125rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    lineHeight: '1.5rem',
    margin: 0,
  },
  wrapperSearch: {
    position: 'relative',
    display: 'inline-block',
  },
  formControl: {
    display: 'block',
    width: '100%',
    height: '40px',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#495057',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    border: '1px solid #ced4da',
    '& input': {
      height: '24px',
      padding: '6px 0 6px 35px',
    },
    '& ::before': {
      border: 'none',
    },
    '& ::after': {
      border: 'none',
    },
  },
  iconSearch: {
    position: 'absolute',
    left: 10,
    top: 'calc(50% - 0.5em)',
  },
  headerBtn: {
    background: '#fff',
    border: '1px solid #ced4da',
    borderRadius: 0,
    textTransform: 'none',
    '& svg': {
      verticalAlign: 'middle',
      margin: '0 2px 3px',
    },
  },
  searchGroup: {
    display: 'block',
    width: '100%',
  },
}));

PageMainHeader.propTypes = {
  feature: PropTypes.string,
  icon: PropTypes.string,
  page: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
  handleSearchEnter: PropTypes.func,
  handleRefresh: PropTypes.func,
  handleFilter: PropTypes.func,
  handleExport: PropTypes.func,
  handleImport: PropTypes.func,
  handleCreate: PropTypes.func,
};

PageMainHeader.defaultProps = {
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

function PageMainHeader(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const { Permissions } = auth;
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

  const form = useForm({
    defaultValues: {
      searchInput: '',
    },
  });

  const allowCreate = Permissions.some((x) => x.Name === `${feature}Create`);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={4}>
          {icon != null && icon !== '' && <Icon className={classes.headerIcon}>{icon}</Icon>}
          <span>
            <span className="module">{page}</span>
            <h6 className={classes.headerTitle}>{title}</h6>
          </span>
          {children}
        </Grid>
        <Grid item md={8} className="text-right">
          {handleSearchEnter !== undefined && handleSearchEnter != null && (
            <div className={classes.wrapperSearch}>
              <form onSubmit={form.handleSubmit(handleSearchEnter)}>
                <div className={`${classes.searchGroup} input-group-btn`}>
                  <InputField
                    name="searchInput"
                    className={classes.formControl}
                    placeholder="Ấn Enter để tìm..."
                    form={form}
                  />
                  <Icon className={classes.iconSearch}>search</Icon>
                </div>
              </form>
            </div>
          )}
          {handleRefresh !== undefined && handleRefresh != null && (
            <Button className={classes.headerBtn} onClick={handleRefresh}>
              <CachedRoundedIcon />
            </Button>
          )}
          {handleFilter !== undefined && handleFilter != null && (
            <Button className={classes.headerBtn} onClick={handleFilter}>
              <LocalBarOutlinedIcon />
            </Button>
          )}
          {handleExport !== undefined && handleExport != null && (
            <Button className={classes.headerBtn} onClick={handleExport}>
              <CloudDownloadOutlinedIcon /> Xuất Excel
            </Button>
          )}
          {handleImport !== undefined && handleImport != null && (
            <Button className={classes.headerBtn} onClick={handleImport}>
              <CloudUploadOutlinedIcon /> Nhập Excel
            </Button>
          )}
          {handleCreate && allowCreate && (
            <Button className={classes.headerBtn} onClick={handleCreate}>
              <AddOutlinedIcon /> Tạo mới
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default PageMainHeader;
