import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

ProductTable.propTypes = {
  productList: PropTypes.array,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

ProductTable.defaultProps = {
  productList: [],
  onEdit: null,
  onRemove: null,
};

function ProductTable(props) {
  const { productList, onEdit, onRemove } = props;
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleRemoveConfirm = (product) => {
    onRemove?.(product);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((item) => (
              <TableRow key={item.id}>
                <TableCell width={310}>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Box color={item.color} />
                </TableCell>
                <TableCell>{'$' + item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    className="p2"
                    color="primary"
                    onClick={() => onEdit?.(item)}
                  >
                    Edit
                  </Button>

                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(item)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a product?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove product named "{selectedProduct?.name}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedProduct)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductTable;
