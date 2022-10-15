import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import Pager from 'components/pager';
import PropTypes from 'prop-types';
import ScrollableTable from './scrollable-table';

const useStyles = makeStyles(() => ({
  cell: {
    padding: '0 5px',
  },
}));

DataTable.propTypes = {
  list: PropTypes.array,
  displayColumns: PropTypes.array,
  pagination: PropTypes.object,
  handleFiltered: PropTypes.func,
  handlePageChange: PropTypes.func,
  actionEdit: PropTypes.func,
  actionDelete: PropTypes.func,
};

function DataTable({
  list = [],
  displayColumns = [],
  pagination = {},
  handleFiltered = null,
  handlePageChange = null,
  actionEdit = null,
  actionDelete = null,
}) {
  const classes = useStyles();
  const applyFiltered = (column, event) => {
    if (!handleFiltered) return;

    setTimeout(() => {
      const { value } = event.target;
      const key = typeof value === 'string' ? `${column}_like` : column;
      handleFiltered(key, value);
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

  return (
    <>
      <ScrollableTable>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell} align="center">
                STT
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
          <TableBody>
            {list.map((row, index) => (
              <TableRow key={index}>
                <TableCell className={classes.cell} align="center">
                  {index + 1}
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
            ))}
          </TableBody>
        </Table>
      </ScrollableTable>
      <Pager
        page={pagination.PageIndex}
        total={pagination.TotalCount}
        limit={pagination.PageSize}
        changePage={pageChange}
      />
    </>
  );
}

export default DataTable;
