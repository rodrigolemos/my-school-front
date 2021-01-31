import React, { ReactElement, useState } from 'react';
import { useTheme } from '../../hooks/theme';
import { Cookies } from 'react-cookie';
import api from '../../services/api';
import Toast from '../toast';
import { CircularProgress } from '@material-ui/core';
import { Button, Dialog, DialogActions, InputLabel, FormControl } from '@material-ui/core';
import { CustomDialogContent, Form, CustomInput, CustomSelect, CustomMenuItem } from './styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ICreatedBy {
  id: string;
  name: string;
  email: string;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  contact: string;
  created_by: ICreatedBy;
  created_at: Date;
  updated_at: Date;
}

interface IUserDialog {
  open: boolean;
  handleDialog(open: boolean): void;
  users?: IUser[];
  setUsers(users: IUser[]): void;
  setSuccessDialog(message: string): void;
}

interface IFormInput {
  name: string;
  email: string;
  password: string;
  role: string;
  created_by: string;
}

const schema = yup.object().shape({
  name: yup.string().required().min(6),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  role: yup.string().required().min(5).max(7)
});

export default function UserDialog({
  open,
  handleDialog,
  users,
  setUsers,
  setSuccessDialog
}: IUserDialog): ReactElement {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { register, control, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    handleDialog(false);
  };

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');
      const { id } = cookies.get('@my-school:user');

      data.created_by = id;

      const response = await api.post('/users/create', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 200 && response.status !== 201) throw new Error();

      setUsers([...users, response.data]);
      setSuccessDialog('Usuário incluido com sucesso!');

      handleClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400) {
          setError(
            'Ops, não foi possível incluir o usuário. Por favor, verifique o nome e o período e tente novamente.'
          );
        } else {
          setError('Ops, não foi possível incluir o curso. Por favor, tente novamente mais tarde.');
        }
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md">
      <CustomDialogContent customtheme={theme}>
        {error && <Toast type="error" message={error} />}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Incluir Usuário</h1>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            as={<CustomInput label="Nome" variant="filled" required ref={register} />}
          />
          {errors.name && <p className="error">Preencha corretamente o nome</p>}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            as={<CustomInput label="E-mail" variant="filled" required ref={register} />}
          />
          {errors.email && <p className="error">Preencha corretamente o e-mail</p>}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            as={
              <CustomInput
                type="password"
                label="Senha"
                variant="filled"
                required
                ref={register}
                autoComplete=""
              />
            }
          />
          {errors.password && <p className="error">Preencha corretamente a senha</p>}
          <FormControl variant="filled" className="select-role">
            <InputLabel id="role-input">Perfil</InputLabel>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              as={
                <CustomSelect
                  customtheme={theme}
                  labelId="role-input"
                  defaultValue=""
                  required
                  ref={register}>
                  <CustomMenuItem value="teacher">Professor</CustomMenuItem>
                  <CustomMenuItem value="admin">Administrador</CustomMenuItem>
                </CustomSelect>
              }
            />
          </FormControl>
          {errors.role && <p className="error">Preencha corretamente o perfil</p>}
          {!loading ? (
            <DialogActions>
              <Button type="submit" variant="contained" color="primary" size="large">
                Incluir
              </Button>
              <Button onClick={handleClose} variant="contained" size="large">
                Cancelar
              </Button>
            </DialogActions>
          ) : (
            <DialogActions>
              <CircularProgress />
            </DialogActions>
          )}
        </Form>
      </CustomDialogContent>
    </Dialog>
  );
}
