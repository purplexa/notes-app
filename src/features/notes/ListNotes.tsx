import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoryNotes } from './notesSlice';
import Note from './Note';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
}));

interface Params {
  category_id: string,
}

const ListNotes = () => {
  const classes = useStyles();
  const { category_id } = useParams<Params>();
  const notes = useSelector(selectCategoryNotes(category_id));
  return (
    <div className={classes.root}>
      {Object.entries(notes).map(([k, v]) =>
        <Note
          key={v.id}
          id={v.id}
          categoryId={category_id}
          title={v.title}
          date={v.date}
        >
          {v.body}
        </Note>
      )}
    </div>
  );
}

export default ListNotes;