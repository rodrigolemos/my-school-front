import { IconButton } from '@material-ui/core';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';
import { TableCell } from '@material-ui/core';
import { MyTableRow } from './styles';

export const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      fontSize: 16
    },
    head: {
      backgroundColor: '#222',
      color: '#F6F7FE'
    },
    body: {
      fontSize: 16
    }
  })
)(TableCell);

export const StyledTableRow = withStyles(() => createStyles({}))(MyTableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(3),
      fontSize: 16
    }
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
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
