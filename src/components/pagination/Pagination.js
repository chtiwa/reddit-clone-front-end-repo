import React, { useEffect, useState } from 'react'
import './pagination.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../redux/posts/postsActions'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Pagination = ({ page, setPage }) => {
  const query = useQuery()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [page, setPage] = useState()

  useEffect(() => {
    // check if the route is in the first page
    setPage(Number(query.get('page')) || 1)
    if (page === undefined) { setPage(1) }
    console.log(page)
  }, [query, page])

  useEffect(() => {
    console.log('page', page)
    dispatch(getPosts(page))
  }, [dispatch, page])
  let pages = 20
  let array = []
  for (let i = 0; i < pages; i++) {
    array.push(i + 1)
    // the array represents the pages
  }

  const handleChangePage = (newPage) => {
    setPage(newPage)
    console.log(newPage)
    // the navigation will be based on the location
    console.log(location)
    if (location.pathname === '/user') {
      navigate(`/user?page=${newPage}`)
    } else if (location.pathname === '/r/:tag') {
      navigate(`/r/:tag?page=${newPage}`)
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
        {array.slice(startingPage, startingPage + 5 == pages ? startingPage + 4 : startingPage + 5).map((arrayPage) => {
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

  return (
    <div className="pagination">
      <button onClick={() => handleChangePage(page - 1)} disabled={page === 1} className='icon-btn' >
        <FaChevronLeft className="pagination-icon" />
      </button>
      {middlePagination}
      <button onClick={() => handleChangePage(page + 1)} disabled={page === pages} className='icon-btn'>
        <FaChevronRight className="pagination-icon" />
      </button>
    </div>
  )
}

export default Pagination