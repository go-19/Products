import {Route, Redirect} from 'react-router-dom' 

function Private ({ isAuth, component: Component, ...rest }) {

	return (
		<Route 
			{...rest}
			render={props => {
				if (isAuth) {
					return <Component />
				} else {
					return (
						<Redirect to={{pathname: '/', state: {from: props.location}}} />
					)
				}
			}}
		>
		</Route>
	)
}

export default Private