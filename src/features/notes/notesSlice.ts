import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface Note {
  id: string,
  date: number,
  title: string,
  body: string,
}

export interface Category {
  id: string,
  name: string,
  notes: {
    [key: string]: Note,
  },
}

export interface NotesState {
  categories: {
    [key: string]: Category,
  },
  errors: {
    create: string[],
  }
}

const initialState: NotesState = {
  categories: {},
  errors: {
    create: [],
  },
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded(state, action) {
      const post = {
        id: action.payload.id,
        date: action.payload.date,
        title: action.payload.title,
        body: action.payload.body,
      }
      if (state.categories[action.payload.categoryId]) {
        state.categories[action.payload.categoryId].notes[action.payload.id] = post;
      } else {

      }
    },
    noteRemoved(state, action) {
      if (state.categories[action.payload.categoryId]) {
        delete state.categories[action.payload.categoryId].notes[action.payload.id];
      }
    },
    noteEdited(state, action) {
      if (state.categories[action.payload.categoryId]
        && state.categories[action.payload.categoryId].notes[action.payload.id]) {
        state.categories[action.payload.categoryId].notes[action.payload.id].date = action.payload.date;
        state.categories[action.payload.categoryId].notes[action.payload.id].title = action.payload.title;
        state.categories[action.payload.categoryId].notes[action.payload.id].body = action.payload.body;
      }
    },
    categoryAdded(state, action) {
      const post = {
        id: action.payload.id,
        name: action.payload.name,
        notes: {},
      };
      state.categories[action.payload.id] = post;
    },
  }
});

export const { noteAdded, noteRemoved, noteEdited, categoryAdded } = notesSlice.actions;

export const selectCategoryNotes = (categoryId: string) => {
  return (state: RootState) => {
    const category = state.notes.categories[categoryId];
    if (category) {
      return category.notes;
    }
    else {
      return {};
    }
  }
}

export const selectCategory = (categoryId: string) => {
  return (state: RootState) => state.notes.categories[categoryId];
}

export const selectCategories = (state: RootState) => state.notes.categories;

export const selectNote = (categoryId: string, id: string) => {
  return (state: RootState) => {
    if (state.notes.categories[categoryId]) {
      return state.notes.categories[categoryId].notes[id];
    }
    else {
      return {
        id,
        date: 0,
        title: '',
        body: '',
      };
    }
  }
}

export default notesSlice.reducer;