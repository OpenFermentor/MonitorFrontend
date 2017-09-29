import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import MainNavigation from './navigation'

import Dashboard from './dashboard'
import PhCalibration from './calibration/ph'
import Experiment from './experiment'

const ROUTES = [{
  path: '/dashboard',
  component: Dashboard,
  title: 'En curso'
}, {
  path: '/experiment',
  component: Experiment,
  title: 'Experimentos'
}, {
  path: '/calibration/ph',
  component: PhCalibration,
  title: 'Calibración'
}]

export default class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <MainNavigation routes={ROUTES} />

          { ROUTES.map(({ path, component }, index) => (
            <Route
              key={index}
              path={path}
              component={component}
            />
          ))}

        </div>
      </BrowserRouter>
    )
  }
}
