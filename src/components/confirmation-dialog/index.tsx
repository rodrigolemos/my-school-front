import React, { ReactElement, useState } from 'react';
import { useTheme } from '../../hooks/theme';
import { Cookies } from 'react-cookie';
import api from '../../services/api';
import Toast from '../toast';
import { CircularProgress } from '@material-ui/core';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { CustomDialogContent, Form } from './styles';

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

interface ICourseDialog {
  open: boolean;
  handleDialog(open: boolean): void;
  userToDelete?: IUser;
  users?: IUser[];
  setUsers(users: IUser[]): void;
  setSuccessDialog(message: string): void;
}

export default function ConfirmationDialog({
  open,
  handleDialog,
  userToDelete,
  users,
  setUsers,
  setSuccessDialog
}: ICourseDialog): ReactElement {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleClose = () => {
    handleDialog(false);
  };

  const deleteUser = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');

      const response = await api.delete(`/users/${userToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 204) throw new Error();

      setUsers(users.filter((user) => user.id !== userToDelete.id));

      setSuccessDialog('Usuário excluído com sucesso!');

      handleClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400) {
          setError(
            'Atenção, este usuário está vinculado a um ou mais cursos. Exclua as matrículas/cursos antes de prosseguir.'
          );
        } else {
          setError(
            'Ops, não foi possível excluir o usuário. Por favor, tente novamente mais tarde.'
          );
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
      maxWidth="sm">
      <CustomDialogContent customtheme={theme}>
        {error && <Toast type="error" message={error} />}
        <Form>
          <h1>Excluir Usuário </h1>
          <div className="alert">
            Atenção! Deseja realmente excluir o usuário <u>{userToDelete.name}</u>? Essa ação não
            pode ser desfeita.
          </div>
          {!loading ? (
            <DialogActions>
              <Button onClick={deleteUser} variant="contained" color="secondary" size="large">
                Excluir
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
