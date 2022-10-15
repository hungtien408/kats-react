import { makeStyles } from '@material-ui/core';
import PageMain from 'components/page-main';
import DataTable from 'components/table';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQueryString } from 'utils/query-string';
import { getOrderList, setFilter, setPage } from '../order-slice';

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
  const { items, pageIndex, pageSize, totalCount, filters } = order;

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
    const params = { pageIndex, pageSize };
    const queryString = getQueryString(params, filters);
    dispatch(getOrderList(queryString));
  }, [dispatch, filters, pageIndex, pageSize]);

  const onFiltered = (key, value) => {
    const filter = {
      Field: key,
      Operator: '==',
      Value: value,
    };
    const newFilters = filters.filter((x) => x.Field !== filter.Field);
    dispatch(setFilter([filter, ...newFilters]));
  };

  const onSearchEnter = (values) => {
    // const { searchInput } = values;
    // dispatch(setFilter({ ...filter, q: searchInput || undefined }));
  };

  const onRefresh = () => {
    const params = { pageIndex, pageSize };
    const queryString = getQueryString(params, filters);
    dispatch(getOrderList(queryString));
  };

  const onCreate = (e) => {
    // setSelectedProduct(null);
    // setOpenDialog(true);
  };

  const onPageChange = (page) => {
    dispatch(setPage(page - 1));
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
        items={items}
        displayColumns={displayColumns}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        handleFiltered={onFiltered}
        handlePageChange={onPageChange}
        actionEdit={handleActionEdit}
        actionDelete={handleActionDelete}
      />
    </PageMain>
  );
}

export default OrderList;
