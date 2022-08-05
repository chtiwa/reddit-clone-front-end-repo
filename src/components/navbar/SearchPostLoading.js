import React from 'react'

const SearchPostLoading = () => {
  return (
    <div className="navbar-search-link-loading">
      <div className="navbar-search-content-post-loading">
        <div className="navbar-search-content-post-loading-title skeleton"></div>
        <div className="navbar-search-content-post-loading-inner">
          <div className="navbar-search-content-post-loading-image skeleton"></div>
          <div className="navbar-search-content-post-loading-desc skeleton"></div>
        </div>
        <div className="navbar-search-content-tags-loading skeleton"></div>
      </div>
    </div>
  )
}

export default SearchPostLoading