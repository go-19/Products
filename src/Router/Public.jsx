import {Route} from 'react-router-dom'

function Public ({children, rest}) {

  return (
    <Route {...rest}>
      {children}
    </Route>
  )
}

export default Public