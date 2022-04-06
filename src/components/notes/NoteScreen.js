import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDelete } from '../../actions/notes'

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes)

  const dispatch = useDispatch();

  const [values, handleInputChange, resetInput] = useForm(note)

  const { title, body, id } = values

  //para redibujar el componente con el contenido de la nota seleccionada
  //nuevamente
  const activeId = useRef(note.id)

  useEffect(() => {
    if (note.id !== activeId.current) {
      resetInput(note)
      activeId.current = note.id
    }
  }, [note, resetInput])

// se dispara c
  useEffect(() => {
    dispatch(activeNote(values.id, {...values}))
  }, [values, dispatch])



  const handleDelete = () => {
    dispatch(startDelete( id ))
  }

  return (
    <div className="notes__main-content" >
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          cols="30"
          rows="10"
          placeholder="What happenened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__images">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>

      <button className="btn-transparent btn" onClick={handleDelete}>
      ❌ Delete Note
      </button>
    </div>
    
  )
}
