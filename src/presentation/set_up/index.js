import React from 'react'
import { Route } from 'react-router-dom'

import Toolbar from '../common/toolbar'
import SetUpHome from './home'
import PhCalibration from './ph'
import PumpCalibration from './pump'

const ROUTES = match => [{
  path: match.url,
  exact: true,
  component: SetUpHome,
  itemIndex: 0,
  title: 'Calibración'
}, {
  path: match.url + '/ph',
  exact: true,
  component: PhCalibration,
  itemIndex: 1,
  title: 'pH-metro'
}, {
  path: match.url + '/pump',
  itemIndex: 1,
  component: PumpCalibration,
  title: 'Bombas peristálticas'
}]

const SetUp = ({ match }) => {
  const routes = ROUTES(match)
  return (
    <div className='contentWrapper'>
      <Toolbar
        breadcrumb={routes}
      />
      { routes.map(({ path, component, exact }, index) => (
        <Route
          key={index}
          exact={exact}
          path={path}
          component={component}
        />
      ))}
    </div>
  )
}

export default SetUp
