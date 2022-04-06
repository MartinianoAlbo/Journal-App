import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JournalEntries } from './JournalEntries'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const {name} = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleAddNew = () => { 
      dispatch(startNewNote())
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3>
          <i className="far fa-moon"></i>
          {name}
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <button className="btn journal__new-entry"
      onClick={handleAddNew}
      >
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">new entry</p>
      </button>

      <JournalEntries />
    </aside>
  )
}
