import React from 'react'
import './styles.css'

const DashboardCard = ({ children }) => {
  return (
    <div className='card'>
      { children }
    </div>
  )
}

export default DashboardCard
