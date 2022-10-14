import { makeStyles } from '@material-ui/core';
import PageMain from 'components/page-main';
import DataTable from 'components/table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderList, setFilter } from '../order-slice';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

function OrderList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { list, filter, pagination } = order;

  const displayColumns = [
    {
      field: 'Number',
      title: 'Số',
      type: 'text',
      align: 'left',
    },
    {
      field: 'CustomerCode',
      title: 'Mã khách hàng',
      type: 'text',
      align: 'left',
    },
    {
      field: 'CustomerName',
      title: 'Tên khách hàng',
      type: 'text',
      align: 'left',
    },
    {
      field: 'OwnerName',
      title: 'Người sở hữu',
      type: 'text',
      align: 'left',
    },
  ];

  useEffect(() => {
    dispatch(getOrderList(filter));
  }, [dispatch, filter]);

  const onFiltered = (key, value) => {
    dispatch(setFilter({ ...filter, [key]: value || undefined }));
  };

  const onSearchEnter = (values) => {
    const { searchInput } = values;
    dispatch(setFilter({ ...filter, q: searchInput || undefined }));
  };

  const onRefresh = () => {
    dispatch(getOrderList({ ...filter, _page: 1 }));
  };

  const onCreate = (e) => {
    // setSelectedProduct(null);
    // setOpenDialog(true);
  };

  const onPageChange = (page) => {
    dispatch(setFilter({ ...filter, _page: page }));
  };

  const handleActionEdit = (product) => {
    // setSelectedProduct(product);
    // setOpenDialog(true);
  };

  const handleActionDelete = (product) => {
    // setSelectedProduct(product);
    // setOpenDialogDelete(true);
  };

  return (
    <PageMain
      feature="Order"
      page="Đơn hàng"
      title="Tất cả đơn hàng"
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
    </PageMain>
  );
}

export default OrderList;
