import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import api from '../services/api';
import { getServerSidePropsAdmin } from '../utils/server-props';
import { formatDate } from '../utils/date';
import { formatDescription, formatPeriod } from '../utils/courses';
import { useTheme } from '../hooks/theme';
import { FiEdit3 } from 'react-icons/fi';
import {
  Button,
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
import CourseDialog from '../components/course-dialog';
import Toast from '../components/toast';
import { Header, Content } from '../styles/pages/courses';

interface IServerCourses {
  name: string;
  isAdmin: boolean;
}

interface ICreatedBy {
  id: string;
  name: string;
  email: string;
}

interface ICourse {
  id: string;
  name: string;
  description: string;
  period: string;
  positions: number;
  created_by: ICreatedBy;
  created_at: Date;
  updated_at: Date;
}

export default function Courses({ name, isAdmin }: IServerCourses): ReactElement {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [courseToEdit, setCourseToEdit] = useState<ICourse>(({} as ICourse) || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [successDialog, setSuccessDialog] = useState<string>();
  const { theme } = useTheme();

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, courses.length - page * rowsPerPage);

  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const openEditDialog = useCallback((course: ICourse): void => {
    setCourseToEdit(course);
    setOpenDialog(true);
  }, []);

  const openAddDialog = useCallback((): void => {
    setCourseToEdit(null);
    setOpenDialog(true);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get<ICourse[]>('/courses');
      if (response.status !== 200) throw new Error();

      setCourses(response.data);
    } catch (error) {
      if (error.response) {
        setError('Ops, não foi possível listar os cursos. Por favor, tente novamente mais tarde.');
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  }, []);

  return (
    <Layout isAdmin={isAdmin} title="Cursos">
      <Header>
        <div className="greeting">
          <h2>Bem vindo novamente, {name}!</h2>
          <h3>Esses são os cursos disponíveis atualmente</h3>
        </div>
        <div className="add">
          <Button onClick={openAddDialog} color="primary" variant="contained" size="large">
            Incluir
          </Button>
        </div>
      </Header>
      <Content>
        <CourseDialog
          open={openDialog}
          handleDialog={setOpenDialog}
          courseToEdit={courseToEdit}
          courses={courses}
          setCourses={setCourses}
          setSuccessDialog={setSuccessDialog}
        />
        {error && <Toast type="error" message={error} />}
        {successDialog && <Toast type="success" message={successDialog} />}
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell>Descrição</StyledTableCell>
                  <StyledTableCell>Período</StyledTableCell>
                  <StyledTableCell align="center">Vagas</StyledTableCell>
                  <StyledTableCell align="center">Criado por</StyledTableCell>
                  <StyledTableCell align="center">Atualizado em</StyledTableCell>
                  <StyledTableCell align="center">Editar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : courses
                ).map((course) => (
                  <StyledTableRow key={course.id} customtheme={theme}>
                    <StyledTableCell component="th" scope="row" style={{ width: 200 }}>
                      {course.name}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ width: 450 }}>
                      {formatDescription(course.description, 200)}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ width: 100 }}>
                      {formatPeriod(course.period)}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 50 }}>
                      {course.positions}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 150 }}>
                      {course.created_by.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 250 }}>
                      {formatDate(course.updated_at)}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 30 }}>
                      <FiEdit3
                        onClick={() => openEditDialog(course)}
                        style={{ cursor: 'pointer' }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <StyledTableRow style={{ height: 53 * emptyRows }} customtheme={theme}>
                    <StyledTableCell colSpan={7} />
                  </StyledTableRow>
                )}
              </TableBody>
              <TableFooter>
                <StyledTableRow customtheme={theme}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    colSpan={7}
                    count={courses.length}
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
        )}
      </Content>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAdmin;
