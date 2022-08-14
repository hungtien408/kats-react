import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/input-field';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  field: {
    margin: theme.spacing(1, 0),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
}));

ProductForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

function ProductForm({ initialValues = null, onSubmit = null }) {
  const classes = useStyles();
  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập sản phẩm'),
    price: yup.number().positive('Giá phải là một số dương').required('Vui lòng nhập giá'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      price: 0,
      ...initialValues,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (!onSubmit) return;

    await onSubmit(values);
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField className={classes.field} name="name" label="Tên sản phẩm" form={form} />
      <InputField className={classes.field} name="price" label="Giá" type="number" form={form} />
      <Button
        disabled={isSubmitting}
        type="submit"
        className={classes.submit}
        variant="contained"
        color="primary"
        fullWidth
      >
        Lưu
      </Button>
    </form>
  );
}

export default ProductForm;
