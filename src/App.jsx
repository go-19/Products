import './App.css';
import { Switch } from 'react-router';
import Public from './Router/Public';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn'
import Private from './Router/Private'
import Products from './Pages/Products/Products'


function App() {

  const storaged = localStorage.getItem('products_auth')

  return (
    <Switch>
      <Public exact path='/'>
        <Home />
      </Public>
      <Public exact path='/signin'>
        <SignIn />
      </Public>
      <Private exact path='/products' component={Products} isAuth={storaged ? true : false} />
    </Switch>
  );
}

export default App;