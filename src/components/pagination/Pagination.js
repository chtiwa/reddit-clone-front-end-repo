import React, { useEffect } from 'react'
import './pagination.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Pagination = ({ page, setPage }) => {
  const query = useQuery()
  const location = useLocation()
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()
  // const [page, setPage] = useState()
  const { pages, posts, loading
  } = useSelector(state => state.posts)

  useEffect(() => {
    // check if the route is in the first page
    setPage(Number(query.get('page')) || 1)
    if (page === undefined) { setPage(1) }
    console.log(page)
  }, [query, page, setPage])

  useEffect(() => {
    // console.log('page', page)
    // dispatch(getPosts(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])
  // let pages = 20
  let array = []
  for (let i = 0; i < pages; i++) {
    array.push(i + 1)
    // the array represents the pages
  }

  const handleChangePage = (newPage) => {
    // scroll to the top of the page
    setPage(newPage)
    console.log(newPage)
    // the navigation will be based on the location
    console.log(location)
    if (location.pathname === '/user') {
      navigate(`/user?page=${newPage}`)
    } else if (location.pathname === `/r/${tag}`) {
      navigate(`/r/${tag}?page=${newPage}`)
      console.log(tag)
    } else if (location.pathname === '/') {
      navigate(`/?page=${newPage}`)
    }
  }

  let middlePagination

  if (pages <= 8) {
    middlePagination = (
      <div className='pagination-inner'>
        {array.map((arrayPage) => {
          // console.log(arrayPage, page)
          return (
            <button key={arrayPage} onClick={() => handleChangePage(arrayPage)} className={`${arrayPage === Number(page) ? 'active' : ''}`} >
              {arrayPage}
            </button>
          )
        })}
      </div>
    )
  } else {
    const startingPage = Math.floor((Number(page) - 1) / 5) * 5
    // console.log(startingPage)
    middlePagination = (
      <div className="pagination-inner">
        {array.slice(startingPage, startingPage + 5 === pages ? startingPage + 4 : startingPage + 5).map((arrayPage) => {
          return (
            <button key={arrayPage} onClick={() => handleChangePage(arrayPage)} className={`${arrayPage === Number(page) ? 'active' : ''}`} >
              {arrayPage}
            </button>
          )
        })}
        {startingPage + 5 === pages ? (<></>) : (<button>...</button>)}
        <button onClick={() => handleChangePage(pages)} className={`${pages === Number(page) ? 'active' : ''}`}>{pages}</button>

      </div>
    )
  }

  if (posts.length === 0 && !loading) {
    return <h2 style={{ textAlign: 'center' }} >No posts</h2>
  }

  return pages > 1 && (
    <div className="pagination">
      <button onClick={() => handleChangePage(page - 1)} disabled={page === 1} className={`icon-btn ${page === 1 && 'hide'}`} >
        <FaChevronLeft className={`pagination-icon ${page === 1 && 'hide'}`} />
      </button>
      {middlePagination}
      <button onClick={() => handleChangePage(page + 1)} disabled={page === pages} className={`icon-btn ${page === pages && 'hide'}`}>
        <FaChevronRight className={`pagination-icon ${page === pages && 'hide'}`} />
      </button>
    </div>
  )
}

export default Pagination