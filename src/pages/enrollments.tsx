import React, { ReactElement, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Cookies } from 'react-cookie';
import EnrollmentDialog from '../components/enrollment-dialog';
import { checkAuth } from '../services/auth';
import api from '../services/api';
import { checkPermission } from '../services/permission';
import { formatDate } from '../utils/date';
import { formatPeriod } from '../utils/courses';
import { formatStatus } from '../utils/enrollments';
import { useTheme } from '../hooks/theme';
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
  FiEdit3
} from 'react-icons/fi';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  CircularProgress,
  Paper,
  IconButton
} from '@material-ui/core';

import Layout from '../components/layout';
import Toast from '../components/toast';
import { Header, Content, MyTableRow, Status, FilterWrapper } from '../styles/pages/enrollments';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 15
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles(() => createStyles({}))(MyTableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      fontSize: 14
    }
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        <FiChevronsLeft />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <FiChevronLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <FiChevronRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        <FiChevronsRight />
      </IconButton>
    </div>
  );
}

interface IServerEnrollments {
  name: string;
  isAdmin: boolean;
}

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

  const openAddDialog = (): void => {
    setEnrollmentToEdit(null);
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

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

  return (
    <Layout isAdmin={isAdmin} title="Matrículas">
      <Header>
        <div className="greeting">
          <h2>Bem vindo novamente, {name}!</h2>
          <h3>Aqui você gerencia as matrículas na plataforma!</h3>
        </div>
        <div className="add">
          <Button onClick={openAddDialog} color="primary" variant="contained" size="large">
            Incluir
          </Button>
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
                    <StyledTableCell align="center">Vagas</StyledTableCell>
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
                      <StyledTableCell align="center" style={{ width: 150 }}>
                        {enrollment.course_id.positions}
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
                        <FiEdit3
                          onClick={() => openEditDialog(enrollment)}
                          style={{ cursor: 'pointer' }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <StyledTableRow style={{ height: 53 * emptyRows }} customtheme={theme}>
                      <StyledTableCell colSpan={9} />
                    </StyledTableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <StyledTableRow customtheme={theme}>
                    <TablePagination
                      rowsPerPageOptions={[5, 10]}
                      colSpan={9}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<IServerEnrollments> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token']);
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user']);
    const isAdmin = await checkPermission(context.req.cookies['@my-school:token'], id);
    return {
      props: {
        name,
        isAdmin
      }
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};
