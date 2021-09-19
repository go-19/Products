function LandingPage() {

  return (
    <>
      <header className='py-4 bg-light'>
        <div className="container d-flex align-items-center justify-content-between">
          <a className='text-decoration-none font-weight-bold h2 text-success' href="/">Products</a>
          <div>
            {
              localStorage.getItem('products_auth') ? (
                <>
                  <a className='btn btn-success mx-2' href="/products">PRODUCTS</a>
                </>
              ) : ''
            }
            {
              !localStorage.getItem('products_auth') ? (
                <>
                  <a className='btn btn-primary mx-2' href="/signin">SIGNIN</a>
                </>
              ) : ''
            }
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <p className='text-center font-weight-bold mt-5 h4'>Welcome to website!</p>
        </div>
      </section>
    </>
  )
}

export default LandingPage