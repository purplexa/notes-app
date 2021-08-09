import { Button, ButtonGroup, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { categoryAdded } from './notesSlice';

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

const CreateCategory = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const saveFn = () => {
    const id = nanoid();
    dispatch(categoryAdded({
      id,
      name,
    }));
    history.push(`/category/${id}`);
  };
  return (
    <div>
      <Typography variant="h4" component="h2">Add Category</Typography>
      <form className={classes.root} noValidate>
        <TextField
          id="create-name"
          className={classes.formItem}
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
        <ButtonGroup className={classes.formItem}>
          <Button color="secondary" variant="outlined" onClick={() => { history.goBack() }}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={saveFn}>Save</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default CreateCategory;