import {
  Collapse,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

NavItem.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.object,
  items: PropTypes.array,
};

NavItem.defaultProps = {
  name: '',
  icon: null,
  items: [],
};

function NavItem(props) {
  const { name, icon, items } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isExpandable = items && items.length > 0;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {
        <ListItem button onClick={handleClick}>
          {!!icon && (
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
          )}

          <ListItemText
            primary={name}
            inset={!Icon}
            className="menu-parent"
            style={{ paddingLeft: 0 }}
          />
          {isExpandable && !isOpen && <ExpandMore />}
          {isExpandable && isOpen && <ExpandLess />}
        </ListItem>
      }
      {isExpandable ? (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" className="menu-sub" disablePadding>
            {items.map((route) =>
              route.items == null || route.items.length === 0 ? (
                <NavLink
                  key={route.path}
                  to={route.path}
                  exact={route.exact}
                  style={{ textDecoration: 'none', color: '#000000' }}
                  activeClassName="menu-link-active"
                >
                  <NavItem {...route} key={route.path} />
                </NavLink>
              ) : (
                <NavItem {...route} key={route.path} />
              )
            )}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

export default NavItem;
