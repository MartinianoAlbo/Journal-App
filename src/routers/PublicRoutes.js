import { Route, Redirect } from 'react-router-dom'


export const PublicRoutes = ({ 
  isAuthenticated,
  component: Component, 
  ...rest
 }) => {

  return (
    <Route {...rest}
      component={(props) => (
        (isAuthenticated)
        ? (<Redirect to={'/'} />) 
        : (<Component {...props} />)
      )}
    />
  )
}
