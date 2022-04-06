import { db } from '../firebase/firebase-config'
import { types } from '../types/types'
import { loadNotes } from '../helpers/loadNotes'
import { fileUpload } from '../helpers/fileUpload'
import Swal from 'sweetalert2'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth //obteniendo el id del usuario

    const newNote = {
      title: 'mi nota',
      body: '...',
      date: new Date().getTime(),
    }

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote)

    dispatch(activeNote(docRef.id, newNote))
    dispatch(addNewNote(docRef.id, newNote))
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
})

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note }
})


export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    console.log(notes.length)
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = { ...note }

    delete noteToFirestore.id

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

    dispatch(refreshNote(note.id, note))
    Swal.fire('Saved', note.title, 'success')
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: { id, note },
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: 'Upload',
      text: 'Please wait',
      allowOutsideClick: false,
    })

    //carga de imagen en helper

    const fileUrl = await fileUpload(file)
    activeNote.url = fileUrl

    dispatch(startSaveNote(activeNote))

    Swal.close()
  }
}

export const startDelete = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid
    await db.doc(`${uid}/journal/notes/${id}`).delete()

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNote(id))
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
})

export const notesLogout = () => ({
  type: types.notesLogoutCleaning,
})
