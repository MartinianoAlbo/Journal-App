import React from 'react'
import {Provider} from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import './styles/styles.scss'
import { store } from './store/store'





export const JournalApp = () => {


  return (
    <Provider store={store}>
  
      <AppRouter />
  
    </Provider>
  )
}
