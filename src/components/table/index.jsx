import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Checkbox,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import Pager from 'components/pager';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ScrollableTable from './scrollable-table';

const useStyles = makeStyles(() => ({
  cell: {
    padding: '0 5px',
  },
}));

DataTable.propTypes = {
  items: PropTypes.array,
  displayColumns: PropTypes.array,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  handleFiltered: PropTypes.func,
  handlePageChange: PropTypes.func,
  actionEdit: PropTypes.func,
  actionDelete: PropTypes.func,
};

function DataTable({
  items = [],
  displayColumns = [],
  pageIndex = 0,
  pageSize = 0,
  totalCount = 0,
  handleFiltered = null,
  handlePageChange = null,
  actionEdit = null,
  actionDelete = null,
}) {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const applyFiltered = (column, event) => {
    if (!handleFiltered) return;

    setTimeout(() => {
      const { value } = event.target;
      handleFiltered(column, value);
    }, 500);
  };

  const pageChange = (page) => {
    if (!handlePageChange) return;
    handlePageChange(page);
  };

  const handleEditClick = (product) => {
    if (!actionEdit) return;
    actionEdit(product);
  };

  const handleDeleteClick = (product) => {
    if (!actionDelete) return;
    actionDelete(product);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n.Id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  function EnhancedTableHead(props) {
    const { numSelected, rowCount, onSelectAllClick } = props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {displayColumns.map((item, index) => (
            <TableCell className={classes.cell} key={index} align={item.align}>
              <div>{item.title}</div>
              {item.type === 'text' && (
                <TextField
                  label={`Tìm theo ${item.title}`}
                  type={item.type}
                  variant="standard"
                  style={{ width: '100%', marginBottom: '5px' }}
                  onChange={(e) => applyFiltered(item.field, e)}
                />
              )}
            </TableCell>
          ))}
          {(actionEdit || actionDelete) && (
            <TableCell className={classes.cell} align="center">
              Hành động
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <>
      <ScrollableTable>
        <Table stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={items.length}
          />
          <TableBody>
            {items.map((row, index) => {
              const isItemSelected = isSelected(row.Id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow key={index} onClick={(event) => handleClick(event, row.Id)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  {displayColumns.map((item, index) => (
                    <TableCell className={classes.cell} key={index} align={item.align}>
                      {row[item.field]}
                    </TableCell>
                  ))}
                  {(actionEdit || actionDelete) && (
                    <TableCell className={classes.cell} align="center" width="150px">
                      {actionEdit && (
                        <IconButton aria-label="edit" onClick={() => handleEditClick(row)}>
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      )}
                      {actionDelete && (
                        <IconButton aria-label="delete" onClick={() => handleDeleteClick(row)}>
                          <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollableTable>
      <Pager page={pageIndex + 1} total={totalCount} limit={pageSize} changePage={pageChange} />
    </>
  );
}

export default DataTable;
