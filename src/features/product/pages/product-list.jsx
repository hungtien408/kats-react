import { Dialog, DialogContent, DialogTitle, IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import DialogConfirm from 'components/dialog/dialog-confirm';
import PageMain from 'components/page-main';
import DataTable from 'components/table';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../components/product-form';
import {
  createProduct,
  deleteProduct,
  getProductList,
  setFilter,
  updateProduct,
} from '../product-slice';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

function ProductList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const displayColumns = [
    {
      field: 'name',
      title: 'Tên',
      type: 'text',
      align: 'left',
    },
    {
      field: 'price',
      title: 'Giá',
      type: 'number',
      align: 'left',
    },
  ];

  const product = useSelector((state) => state.product);
  const { list, filter, pagination } = product;
  const { enqueueSnackbar } = useSnackbar();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isEdit = Boolean(selectedProduct);

  useEffect(() => {
    dispatch(getProductList(filter));
  }, [dispatch, filter]);

  const onFiltered = (key, value) => {
    dispatch(setFilter({ ...filter, [key]: value || undefined }));
  };

  const onSearchEnter = (values) => {
    const { searchInput } = values;
    dispatch(setFilter({ ...filter, q: searchInput || undefined }));
  };

  const onRefresh = () => {
    dispatch(getProductList({ ...filter, _page: 1 }));
  };

  const onCreate = (e) => {
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const onPageChange = (page) => {
    dispatch(setFilter({ ...filter, _page: page }));
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  const handleSubmitProduct = async (values) => {
    try {
      let action = createProduct(values);
      if (isEdit) {
        action = updateProduct({ ...values, id: selectedProduct.id });
      }
      const resultAction = await dispatch(action);
      // unwrapResult dùng để lấy kết quả từ action object nếu success(fulfilled) => return data, fail(rejected) => throw error
      const product = unwrapResult(resultAction);

      handleCloseDialog();
      enqueueSnackbar(`${isEdit ? 'Cập nhật' : 'Tạo'} ${product.name} thành công!!!`, {
        variant: 'success',
      });
      onRefresh();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      const { id, name } = product;
      const action = deleteProduct(id);
      await dispatch(action);

      enqueueSnackbar(`Xóa ${name} thành công!!!`, { variant: 'success' });
      onRefresh();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleActionDelete = (product) => {
    setSelectedProduct(product);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setSelectedProduct(null);
    setOpenDialogDelete(false);
  };

  const handleAcceptDelete = () => {
    if (selectedProduct) handleDeleteProduct(selectedProduct);
    handleCloseDialogDelete();
  };

  const handleActionEdit = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  return (
    <PageMain
      page="Sản Phẩm"
      title="Tất cả sản phẩm"
      handleSearchEnter={onSearchEnter}
      handleRefresh={onRefresh}
      handleCreate={onCreate}
    >
      <DataTable
        list={list}
        displayColumns={displayColumns}
        pagination={pagination}
        handleFiltered={onFiltered}
        handlePageChange={onPageChange}
        actionEdit={handleActionEdit}
        actionDelete={handleActionDelete}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        disableEscapeKeyDown
      >
        <IconButton className={classes.closeButton} onClick={handleCloseDialog}>
          <Close />
        </IconButton>
        <DialogTitle id="form-dialog-title">
          {isEdit ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
        </DialogTitle>
        <DialogContent>
          <ProductForm initialValues={selectedProduct} onSubmit={handleSubmitProduct} />
        </DialogContent>
      </Dialog>

      <DialogConfirm
        isOpen={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onAccept={handleAcceptDelete}
      />
    </PageMain>
  );
}

export default ProductList;
