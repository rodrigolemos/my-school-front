import React, { useCallback, ReactElement, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Cookies } from 'react-cookie';
import { checkAuth } from '../services/auth';
import api from '../services/api';
import { checkPermission } from '../services/permission';
import { formatDate } from '../utils/date';
import ConfirmationDialog from '../components/confirmation-dialog';
import UserDialog from '../components/user-dialog';
import { useTheme } from '../hooks/theme';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BsCardChecklist } from 'react-icons/bs';
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
import { Header, Content, MyTableRow } from '../styles/pages/courses';

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

interface IServerUsers {
  name: string;
  isAdmin: boolean;
}

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

export default function Users({ name, isAdmin }: IServerUsers): ReactElement {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userToDelete, setUserToDelete] = useState<IUser>(({} as IUser) || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [successDialog, setSuccessDialog] = useState<string>();
  const { theme } = useTheme();

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

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

  const openDeleteDialog = useCallback((user: IUser): void => {
    setUserToDelete(user);
    setOpenDialog(true);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');

      const response = await api.get<IUser[]>('/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 200) throw new Error();

      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        setError(
          'Ops, não foi possível listar os usuários. Por favor, tente novamente mais tarde.'
        );
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  }, []);

  return (
    <Layout isAdmin={isAdmin} title="Usuários">
      <Header>
        <div className="greeting">
          <h2>Bem vindo novamente, {name}!</h2>
          <h3>Esses são os usuários cadastrados</h3>
        </div>
        <div className="add">
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => setOpenAddDialog(true)}>
            Incluir
          </Button>
        </div>
      </Header>
      <Content>
        <UserDialog
          open={openAddDialog}
          handleDialog={setOpenAddDialog}
          users={users}
          setUsers={setUsers}
          setSuccessDialog={setSuccessDialog}
        />
        <ConfirmationDialog
          open={openDialog}
          handleDialog={setOpenDialog}
          userToDelete={userToDelete}
          users={users}
          setUsers={setUsers}
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
                  <StyledTableCell>E-mail</StyledTableCell>
                  <StyledTableCell>Perfil</StyledTableCell>
                  <StyledTableCell>Contato</StyledTableCell>
                  <StyledTableCell align="center">Criado em</StyledTableCell>
                  <StyledTableCell align="center">Atualizado em</StyledTableCell>
                  <StyledTableCell align="center">Matrículas</StyledTableCell>
                  <StyledTableCell align="center">Excluir</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : users
                ).map((user) => (
                  <StyledTableRow key={user.id} customtheme={theme}>
                    <StyledTableCell component="th" scope="row" style={{ width: 220 }}>
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ width: 220 }}>
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ width: 100 }}>
                      {user.role}
                    </StyledTableCell>
                    <StyledTableCell align="left" style={{ width: 150 }}>
                      {user.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 200 }}>
                      {formatDate(user.created_at)}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 200 }}>
                      {formatDate(user.updated_at)}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 50 }}>
                      <BsCardChecklist
                        onClick={() => openDeleteDialog(user)}
                        style={{ cursor: 'pointer' }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ width: 50 }}>
                      <AiOutlineUserDelete
                        onClick={() => openDeleteDialog(user)}
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
                    count={users.length}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<IServerUsers> = async (context: any) => {
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
