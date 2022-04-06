import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes'
import { startUploading }  from '../../actions/notes'
import moment from 'moment'

export const NotesAppBar = () => {

  const{active} = useSelector((state) => state.notes)
  const dispatch = useDispatch();
  const momentDate = moment(active.date);

  const handleSave = () => {
    dispatch(startSaveNote(active))
  
  }

  const handlePictureUpload = () => { 
      document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => { 
      e.preventDefault();
      const file = (e.target.files[0]);

      if (file) {
        dispatch(startUploading(file))
      }
  }
  
  
  return (
    
    <div className="notes__appbar sticky-top">
      <span>{momentDate.format('LL')}</span>

      <input id='fileSelector' name='file' type="file" style={{display: 'none'}} onChange={handleFileChange} />

      <div className="">
        <button className="btn" onClick={handlePictureUpload}>Picture</button>

        <button className="btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}
