import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { AUTHORIZATION_KEY } from 'constants/global';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../../../constants/route';
import NavItem from '../nav-item';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: '63px',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuRight: {
    display: 'flex',
  },
  headerGrow: {
    flexGrow: 1,
  },
}));

Content.propTypes = {
  children: PropTypes.object.isRequired,
};

function Content(props) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const [anchorMenuRight, setAnchorMenuRight] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const menuId = 'primary-search-account-menu';

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorMenuRight(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenuRight(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTHORIZATION_KEY);
    if (history) {
      history.push('/login');
    }
  };

  const renderMenuRight = () => {
    const isMenuOpen = Boolean(anchorMenuRight);
    return (
      <Menu
        anchorEl={anchorMenuRight}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  const renderMenuLeft = () => {
    let xhtml = null;
    xhtml = (
      <div>
        <List component="div">
          {ADMIN_ROUTES.map((route) =>
            route.items == null || route.items.length === 0 ? (
              <NavLink
                key={route.path}
                to={route.path}
                exact={route.exact}
                className="menu-link"
                activeClassName="menu-link-active"
              >
                <NavItem {...route} key={route.path} />
              </NavLink>
            ) : (
              <NavItem {...route} key={route.path} className="menu-sub" />
            )
          )}
        </List>
      </div>
    );
    return xhtml;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CRUD
          </Typography>
          <div className={classes.headerGrow} />
          <div className={classes.menuRight}>
            <IconButton color="inherit">
              <LanguageIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {renderMenuLeft()}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </main>
      {renderMenuRight()}
    </div>
  );
}

export default Content;
