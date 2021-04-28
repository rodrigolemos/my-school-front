import React, { ReactElement, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/theme';
import { Cookies } from 'react-cookie';
import api from '../../services/api';
import Toast from '../toast';
import { CircularProgress } from '@material-ui/core';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { CustomDialogContent, Form } from './styles';
import { IUser } from '../../interfaces/IUser';
import { ICourse } from '../../interfaces/ICourse';

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

interface IRequest {
  user_id: string;
  course_id: string;
  approved_by: string;
  status: string;
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

  const updateEnrollment = async (status: string): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');
      const { id } = cookies.get('@my-school:user');

      const data: IRequest = {
        user_id: enrollmentToEdit.user_id.id,
        course_id: enrollmentToEdit.course_id.id,
        approved_by: id,
        status
      };

      const response = await api.put(`/enrollments`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 200) throw new Error();

      setEnrollments(
        enrollments.map((enrollment) => {
          if (
            enrollment.course_id.id === enrollmentToEdit.course_id.id &&
            enrollment.user_id.id === enrollmentToEdit.user_id.id
          ) {
            enrollment = response.data;
          }
          return enrollment;
        })
      );

      setSuccessDialog('Matrícula atualizada com sucesso!');

      handleClose();
    } catch (error) {
      if (error.response) {
        setError('Ops, não foi atualizar matrícula. Por favor, tente novamente mais tarde.');
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 4000);
  }, [error]);

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
          <h1>Aprovar ou cancelar matrícula </h1>
          <div className="alert">
            Atenção! Selecione a opção para a matrícula do usuário{' '}
            <u>{enrollmentToEdit.user_id.name}</u> para o curso{' '}
            <u>{enrollmentToEdit.course_id.name}</u>.
          </div>
          {!loading ? (
            <DialogActions>
              <Button
                onClick={() => updateEnrollment('A')}
                variant="contained"
                color="primary"
                size="large">
                Aprovar
              </Button>
              <Button
                onClick={() => updateEnrollment('C')}
                variant="contained"
                color="secondary"
                size="large">
                Cancelar
              </Button>
              <Button onClick={handleClose} variant="contained" size="large">
                Voltar
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
