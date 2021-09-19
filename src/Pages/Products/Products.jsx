import { useEffect, useRef } from "react"
import { useState } from "react/cjs/react.development"

function Products() {

  const [ data, setData ] = useState([])

  const { token } = JSON.parse(localStorage.getItem('products_auth'))

  // Getting data from API
  useEffect(() => {
    (async () => {
      const response = await fetch('https://face.ox-sys.com/variations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          size: 290,
          page: 1,
          stock: {
            exist: true,
            location: [42]
          }
        })
      })

      const data = await response.json()

      const mappedData = data.items.map(e => {
        return {
          id: e.id,
          name: e.name
        }
      })

      if (mappedData) {
        setData(mappedData)
      }
    })()
  }, [token, setData])


  // Search Filter
  const [output, setOutput] = useState([])
  const searchTerm = useRef()

  const getSearchTerm = () => {
    setOutput([])
    if (searchTerm.current.value) {
      data.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.current.value.toLowerCase()) ? (
          setOutput(output => [...output, item])
        ) : null
      })
    }
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [activePage, setActivePage] = useState(1)
  const PER_PAGE = 12
  const setPageButton = []

  const pageCounter = currentPage => {
    const begin = (currentPage - 1) * PER_PAGE;
    const end = begin + PER_PAGE;

    return data.slice(begin, end);
  }

  if (data.length > 0) {
    for (let i = 1; i <= Math.ceil(data.length / 12); i++) {
      setPageButton.push(i)
    }
  }

  return (
    <>
      <header className='py-2 bg-light'>
        <div className="container d-flex align-items-center justify-content-between">
          <a className='text-decoration-none font-weight-bold h2 text-success' href="/">Products</a>
          <a className='btn btn-primary mx-2' href="/" onClick={() => localStorage.removeItem('products_auth')}>LOGOUT</a>
        </div>
      </header>
      <main>
        <div className="container pt-4 pb-2">

          <form action="">
            <div className="form-group d-flex align-items-center my-4">
              <input type="text" className='form-control' ref={searchTerm} onChange={getSearchTerm} placeholder='Search...' />
              <button className='btn btn-info' type='button'>Search</button>
            </div>
          </form>

          <ul className={output.length > 0 ? "d-none" : "list-unstyled list-group mb-3"}>
            {
              pageCounter(currentPage) ? (
                pageCounter(currentPage).map((item, index) => {
                  return (
                    <li className='list-group-item list-group-item-action' key={index}>
                      <p className='mb-0'>{item.name}</p>
                    </li>
                  )
                })
              ) : null
            }
          </ul>
          <ul className="list-unstyled list-group mb-3">
            {
              output ? (
                output.map((item, index) => {
                  return (
                    <li className='list-group-item list-group-item-action' key={index}>
                      <p className='mb-0'>{item.name}</p>
                    </li>
                  )
                })
              ) : null
            }
          </ul>
          <ul className="pagination flex-wrap d-flex justify-content-center">
            {
              setPageButton ? (
                setPageButton.map((item, index) => {
                  return (
                    <li className={activePage === item ? "page-item active" : "page-item"} key={index}>
                      <button className="page-link" onClick={() => {
                        setCurrentPage(Number(item))
                        setActivePage(item)
                      }}>{item}</button>
                    </li>
                  )
                })
              ) : null
            }
          </ul>
        </div>
      </main>
    </>
  )
}

export default Products