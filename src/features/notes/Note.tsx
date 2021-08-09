import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, makeStyles, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { noteRemoved } from './notesSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
      margin: 10,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface Props {
  title: string,
  date: number,
  id: string,
  categoryId: string,
}

const Note: React.FC<Props> = ({ title, date, id, categoryId, children }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const dateObj = new Date(date);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditOpen = () => {
    history.push(`/category/${categoryId}/${id}/edit`);
  }

  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
  }

  const handleDeleteConfirm = () => {
    dispatch(noteRemoved({
      id,
      categoryId,
    }));
    handleDeleteClose();
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={dateObj.toDateString()}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditOpen}>Edit Note</MenuItem>
        <MenuItem onClick={handleDeleteOpen}>Delete Note</MenuItem>
      </Menu>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        aria-describedby="delete-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {`Delete note "${title}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Collapse
        collapsedSize="200px"
        in={expanded}
        timeout="auto"
      >
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {children}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Note;