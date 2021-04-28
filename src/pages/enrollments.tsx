import React, { ReactElement, useState, useEffect } from 'react';
import { getServerSidePropsAdmin } from '../utils/server-props';
import { Cookies } from 'react-cookie';
import EnrollmentDialog from '../components/enrollment-dialog';
import api from '../services/api';
import { formatDate } from '../utils/date';
import { formatPeriod } from '../utils/courses';
import { formatStatus } from '../utils/enrollments';
import { useTheme } from '../hooks/theme';
import { FiEdit3 } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  CircularProgress,
  Paper
} from '@material-ui/core';
import {
  TablePaginationActions,
  StyledTableCell,
  StyledTableRow,
  useStyles
} from '../components/custom-table';
import Layout from '../components/layout';
import Toast from '../components/toast';
import { Header, Content, Status, FilterWrapper } from '../styles/pages/enrollments';
import { IUser } from '../interfaces/IUser';
import { ICourse } from '../interfaces/ICourse';

interface IServerEnrollments {
  name: string;
  isAdmin: boolean;
}

interface IEnrollment {
  user_id: IUser;
  course_id: ICourse;
  positions: number;
  created_at: Date;
  updated_at: Date;
  status: string;
}

export default function Enrollments({ name, isAdmin }: IServerEnrollments): ReactElement {
  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);
  const [enrollmentToEdit, setEnrollmentToEdit] = useState<IEnrollment>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [successDialog, setSuccessDialog] = useState<string>();
  const { theme } = useTheme();

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, enrollments.length - page * rowsPerPage);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEditDialog = (enrollment: IEnrollment): void => {
    setEnrollmentToEdit(enrollment);
    setOpenDialog(true);
  };

  const fetchEnrollments = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');

      const response = await api.get<IEnrollment[]>('/enrollments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) throw new Error();

      setEnrollments(response.data);
    } catch (error) {
      if (error.response) {
        setError(
          'Ops, não foi possível listar as matrículas. Por favor, tente novamente mais tarde.'
        );
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  return (
    <Layout isAdmin={isAdmin} title="Matrículas">
      <Header>
        <div className="greeting">
          <h2>Bem vindo novamente, {name}!</h2>
          <h3>Aqui você gerencia as matrículas na plataforma!</h3>
        </div>
      </Header>
      <Content>
        {error && <Toast type="error" message={error} />}
        {successDialog && <Toast type="success" message={successDialog} />}
        {loading ? (
          <CircularProgress />
        ) : (
          <FilterWrapper>
            {enrollmentToEdit && (
              <EnrollmentDialog
                open={openDialog}
                handleDialog={setOpenDialog}
                enrollmentToEdit={enrollmentToEdit}
                enrollments={enrollments}
                setEnrollments={setEnrollments}
                setSuccessDialog={setSuccessDialog}
              />
            )}
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Usuário</StyledTableCell>
                    <StyledTableCell>Curso</StyledTableCell>
                    <StyledTableCell>Período</StyledTableCell>
                    <StyledTableCell align="center">Criado em</StyledTableCell>
                    <StyledTableCell align="center">Atualizado em</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Editar</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? enrollments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : enrollments
                  ).map((enrollment) => (
                    <StyledTableRow
                      key={`${enrollment.user_id.id}-${enrollment.course_id.id}`}
                      customtheme={theme}>
                      <StyledTableCell component="th" scope="row" style={{ width: 350 }}>
                        {enrollment.user_id.name} ({enrollment.user_id.email})
                      </StyledTableCell>
                      <StyledTableCell align="left" style={{ width: 200 }}>
                        {enrollment.course_id.name}
                      </StyledTableCell>
                      <StyledTableCell align="left" style={{ width: 100 }}>
                        {formatPeriod(enrollment.course_id.period)}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 200 }}>
                        {formatDate(enrollment.created_at)}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 200 }}>
                        {formatDate(enrollment.updated_at)}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 150 }}>
                        <Status status={enrollment.status}>
                          {formatStatus(enrollment.status)}
                        </Status>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ width: 50 }}>
                        {enrollment.status === 'P' && (
                          <FiEdit3
                            onClick={() => openEditDialog(enrollment)}
                            style={{ cursor: 'pointer' }}
                          />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <StyledTableRow style={{ height: 53 * emptyRows }} customtheme={theme}>
                      <StyledTableCell colSpan={8} />
                    </StyledTableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <StyledTableRow customtheme={theme}>
                    <TablePagination
                      rowsPerPageOptions={[5, 10]}
                      colSpan={8}
                      count={enrollments.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'linhas por página' },
                        native: true
                      }}
                      labelRowsPerPage="Linhas por página"
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </StyledTableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </FilterWrapper>
        )}
      </Content>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAdmin;
