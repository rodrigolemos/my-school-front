import React, { ReactElement } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

interface ICourseDialog {
  open: boolean
  handleDialog(open: boolean): void
}

export default function CourseDialog({ open, handleDialog }: ICourseDialog): ReactElement {

  const handleClose = () => {
    handleDialog(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
            Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
