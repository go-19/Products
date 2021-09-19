import { useRef } from "react"
import { useHistory } from "react-router-dom"

function SignIn() {

  const username = useRef()
  const password = useRef()
  const { push: route } = useHistory()
  
  const handleForm = async e => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://face.ox-sys.com/security/auth_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `_username=${username.current.value}&_password=${password.current.value}&_subdomain=face`
      })

      if (response.status >= 200 && response.status <= 299) {

        let data = await response.json()
        localStorage.setItem('products_auth', JSON.stringify(data))
        return route({ pathname: '/products' })
      }
      else {
        throw new Error(response.statusText || response.status)
      }
    }
    catch (err) {
      alert(err)
      username.current.value = ''
      password.current.value = ''
    }
  }

  return (
    <>
      <section className='container py-5'>
        <div className="alert alert-primary w-50 mx-auto text-center h4 font-weight-bold" role="alert">LOGIN</div>
        <div className="w-25 mx-auto">
          <form onSubmit={handleForm}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" ref={username} autoComplete='off' className="form-control" id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" ref={password} className="form-control" id="password" required />
            </div>
            <button className="btn btn-primary" type='submit'>Submit</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignIn