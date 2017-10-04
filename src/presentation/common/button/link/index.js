import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import Button from '../index'

const ButtonLink = ({ children, to, queryParams, ...props }) => {
  return (
    <Link to={{ to, search: queryString.stringify(queryParams) }}>
      <Button {...props}>{children}</Button>
    </Link>
  )
}

export default ButtonLink
