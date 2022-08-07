import React, { useEffect } from 'react'
import './pagination.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../redux/posts/postsActions'

// function useQuery() {
//   return new URLSearchParams(useLocation().search)
// }

const Pagination = ({ setCreator }) => {
  // const query = useQuery()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()
  const { pages, loading, page
  } = useSelector(state => state.posts)
  useEffect(() => {
    console.log(location.search)
    if (location.search === '') {
      dispatch(setPage(1))
    }
  }, [dispatch, location.search])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  let array = []
  for (let i = 0; i < pages; i++) {
    array.push(i + 1)
  }

  const handleChangePage = (newPage) => {
    dispatch(setPage(newPage))
    if (location.pathname === '/user') {
      console.log(location.search)
      setCreator(location?.state?.creator)
      navigate(`/user?page=${newPage}`, { state: { creator: location.state?.creator } })
    } else if (location.pathname === `/r/${tag}`) {
      navigate(`/r/${tag}?page=${newPage}`)
    } else if (location.pathname === '/') {
      navigate(`/?page=${newPage}`)
    }
  }

  let middlePagination

  if (pages <= 8) {
    middlePagination = (
      <div className='pagination-inner'>
        {array.map((arrayPage) => {
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

  return pages > 1 && !loading && (
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