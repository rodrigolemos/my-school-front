import React, { ReactElement, useState } from 'react';
import { useTheme } from '../../hooks/theme';
import { Cookies } from 'react-cookie';
import api from '../../services/api';
import Toast from '../toast';
import { CircularProgress } from '@material-ui/core';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { CustomDialogContent, Form } from './styles';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ICourse {
  id: string;
  name: string;
  period: string;
  positions: number;
  created_by: IUser;
}
interface IEnrollment {
  user_id: IUser;
  course_id: ICourse;
  positions: number;
  created_at: Date;
  updated_at: Date;
  status: string;
}

interface IEnrollmentDialog {
  open: boolean;
  handleDialog(open: boolean): void;
  enrollmentToEdit?: IEnrollment;
  enrollments?: IEnrollment[];
  setEnrollments(enrollments: IEnrollment[]): void;
  setSuccessDialog(message: string): void;
}

export default function EnrollmentDialog({
  open,
  handleDialog,
  enrollmentToEdit,
  enrollments,
  setEnrollments,
  setSuccessDialog
}: IEnrollmentDialog): ReactElement {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleClose = () => {
    handleDialog(false);
  };

  const updateEnrollment = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');

      const response = await api.delete(`/users/${enrollmentToEdit.course_id.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 204) throw new Error();

      setEnrollments(
        enrollments.filter(
          (enrollment) => enrollment.course_id.id !== enrollmentToEdit.course_id.id
        )
      );

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
          <h1>Aprovar/Excluir matrícula </h1>
          <div className="alert">
            Atenção! Selecione a opção para a matrícula do usuário{' '}
            <u>{enrollmentToEdit.user_id.name}</u> para o curso{' '}
            <u>{enrollmentToEdit.course_id.name}</u>.
          </div>
          {!loading ? (
            <DialogActions>
              <Button onClick={updateEnrollment} variant="contained" color="primary" size="large">
                Aprovar
              </Button>
              <Button onClick={updateEnrollment} variant="contained" color="secondary" size="large">
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
