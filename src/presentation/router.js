import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import MainNavigation from './navigation'

import Dashboard from './dashboard'
import SetUp from './set_up'
import Experiment from './experiment'
import Alerts from './alerts'

const isRemoteClient = process.env.REACT_APP_REMOTE_WEB_APPLICATION

const LOCAL_CLIENT_ROUTES = [{
  path: '/',
  exact: true,
  component: Dashboard,
  title: 'En curso'
}, {
  path: '/experiments',
  component: Experiment,
  title: 'Experimentos'
}, {
  path: '/calibration',
  component: SetUp,
  title: 'Calibración'
}]

const REMOTE_CLIENT_ROUTES = [{
  path: '/',
  exact: true,
  component: Dashboard,
  title: 'En curso'
}, {
  path: '/experiments',
  component: Experiment,
  title: 'Experimentos'
}]

const ROUTES = isRemoteClient ? REMOTE_CLIENT_ROUTES : LOCAL_CLIENT_ROUTES

export const FUNCTIONALITY_ACCESS = {
  showStartExperiment: !isRemoteClient,
  showExperimentCreation: !isRemoteClient,
  showExperimentEdition: !isRemoteClient,
  showExperimentFinalization: !isRemoteClient
}

export default class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='base'>
          <div className='mainWrapper'>
            <MainNavigation routes={ROUTES} />

            <div className='mainContent'>
              { ROUTES.map(({ path, component, exact }, index) => (
                <Route
                  key={index}
                  path={path}
                  exact={exact}
                  component={component}
                />
              ))}

            </div>
          </div>

          <Alerts />

        </div>
      </BrowserRouter>
    )
  }
}
