import React, { ReactElement, useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { checkAuth } from '../services/auth'
import api from '../services/api'
import { checkPermission } from '../services/permission'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import Toast from '../components/toast'
import { Container, Main, ContentWrapper, Header, Content } from '../styles/pages/courses'
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'
import { withStyles, useTheme, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import {
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
} from '@material-ui/core'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: 15,
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      fontSize: 14,
    },
  }),
)

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <FiChevronsRight /> : <FiChevronsLeft />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <FiChevronRight /> : <FiChevronLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <FiChevronLeft /> : <FiChevronRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FiChevronsLeft /> : <FiChevronsRight />}
      </IconButton>
    </div>
  )
}

interface IServerCourses {
  name: string
  isAdmin: boolean
}

interface ICreatedBy {
  id: string
  name: string
  email: string
}

interface ICourses {
  id: string
  name: string
  description: string
  period: string
  created_by: ICreatedBy
  created_at: Date
  updated_at: Date
}

export default function Courses({ name, isAdmin }: IServerCourses): ReactElement {
  const [courses, setCourses] = useState<ICourses[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, courses.length - page * rowsPerPage)

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get<ICourses[]>('/courses')
      if (response.status !== 200)
        throw new Error()

      setCourses(response.data)

      console.log(response.data)

    } catch (error) {
      if (error.response) {
        setError('Ops, não foi possível listar os cursos. Por favor, tente novamente mais tarde.')
      } else {
        setError('Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.')
      }
    }
    setLoading(false)
  }

  return (
    <Container className="themed">
      <SidebarMenu isAdmin={isAdmin} />
      <Main>
        <UserNavBar title="Cursos" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente, {name}!</h2>
              <h3>Esses são os cursos com o seu perfil 📚</h3>
            </div>
            <div className="date"></div>
          </Header>
          <Content>
            {error && <Toast type="error" message={error} />}
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Nome</StyledTableCell>
                      <StyledTableCell>Descrição</StyledTableCell>
                      <StyledTableCell>Criação</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : courses
                    ).map((course) => (
                      <StyledTableRow key={course.name}>
                        <StyledTableCell component="th" scope="row">
                          {course.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {course.description}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {course.created_at}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                      <StyledTableRow style={{ height: 53 * emptyRows }}>
                        <StyledTableCell colSpan={6} />
                      </StyledTableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        colSpan={3}
                        count={courses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'linhas por página' },
                          native: true,
                        }}
                        labelRowsPerPage="Linhas por página"
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            )}
          </Content>
        </ContentWrapper>
      </Main>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<IServerCourses> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token'])
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user'])
    const isAdmin = await checkPermission(
      context.req.cookies['@my-school:token'],
      id
    )
    return {
      props: {
        name,
        isAdmin
      }
    }
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}