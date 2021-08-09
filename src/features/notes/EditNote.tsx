import React, { useState } from 'react';
import { Button, ButtonGroup, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { noteEdited, selectNote } from './notesSlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  formItem: {
    margin: 10,
  }
}))

interface Params {
  category_id: string,
  id: string,
}

const EditNote = () => {
  const { category_id, id } = useParams<Params>();
  const note = useSelector(selectNote(category_id, id));
  const classes = useStyles();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body)
  const history = useHistory();
  const dispatch = useDispatch();
  const saveFn = () => {
    const date = Date.now();
    dispatch(noteEdited({
      id,
      date,
      title,
      body,
      categoryId: category_id,
    }));
    history.push(`/category/${category_id}`);
  }
  if (!note) {
    return <Redirect to={`/category/${category_id}`} />
  }
  return (
    <div>
      <Typography variant="h4" component="h2">Add Note</Typography>
      <form className={classes.root} noValidate>
        <TextField
          id="create-title"
          className={classes.formItem}
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
        <TextField
          id="create-body"
          className={classes.formItem}
          label="Content"
          variant="outlined"
          multiline
          value={body}
          onChange={(e) => { setBody(e.target.value) }}
        />
        <ButtonGroup className={classes.formItem}>
          <Button color="secondary" variant="outlined" onClick={() => { history.goBack() }}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={saveFn}>Save</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default EditNote;