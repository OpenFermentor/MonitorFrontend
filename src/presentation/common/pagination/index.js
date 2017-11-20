import React from 'react'
import './styles.css'

import Container from '../container'
import Icon from '../icon'

const Pagination = ({ page, maxPage, navigateToPage = () => {} }) => {
  if (maxPage === 1) {
    return null
  }
  return (
    <div className='pagination'>
      <Container row center>
        { page !== 1 &&
          <a className='pageControl' onClick={() => navigateToPage(page - 1)}>
            <Icon name='chevronLeft' color='#40C6D6' />
            Página anterior
          </a>
        }
        { previousPages(page, navigateToPage) }
        <p>{page}</p>
        { nextPages(page, maxPage, navigateToPage) }
        { page !== maxPage &&
          <a className='pageControl' onClick={() => navigateToPage(page + 1)}>
            Página siguiente
            <Icon name='chevronRight' color='#40C6D6' />
          </a>
        }
      </Container>
    </div>
  )
}

const previousPages = (page, navigateToPage) => {
  if (page < 5) {
    return iterate(page - 1).map((_, index) => pageLink(index + 1, navigateToPage))
  }
  return [
    pageLink(1, navigateToPage),
    <p>...</p>,
    iterate(2).map((_, index) => pageLink(page - index - 1, navigateToPage)).reverse()
  ]
}

const nextPages = (page, maxPage, navigateToPage) => {
  const remainingPages = maxPage - page
  if (remainingPages < 5) {
    return iterate(remainingPages).map((_, index) => pageLink(page + index + 1, navigateToPage))
  }
  return [
    iterate(2).map((_, index) => pageLink(page + index + 1, navigateToPage)),
    <p>...</p>,
    pageLink(maxPage, navigateToPage)
  ]
}

const iterate = (length = 0) =>
  Array(length).fill()

const pageLink = (page, navigateToPage) =>
  <a key={page} onClick={() => navigateToPage(page)}>{page}</a>

export default Pagination
