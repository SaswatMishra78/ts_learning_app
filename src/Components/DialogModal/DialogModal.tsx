import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

function DialogModal() {
  const [open, setOpen] = useState(false);

    // Open & Close Modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      alert("Form submitted!");
      handleClose();
    };
  return (
    <div>
    <Button variant="contained" onClick={handleOpen}>
      Open Form Modal
    </Button>

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="dense" label="Email" type="email" required />
          <TextField fullWidth margin="dense" label="Password" type="password" required />
          <TextField fullWidth margin="dense" label="Email" type="email" required />
          <TextField fullWidth margin="dense" label="Password" type="password" required />
          <TextField fullWidth margin="dense" label="Email" type="email" required />
          <TextField fullWidth margin="dense" label="Password" type="password" required />
          <TextField fullWidth margin="dense" label="Email" type="email" required />
          <TextField fullWidth margin="dense" label="Password" type="password" required />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default DialogModal
