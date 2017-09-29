import React from 'react'
import { Route } from 'react-router-dom'

import LocalToolbar from '../common/toolbar/local'

import Experiments from './list'
import Experiment from './routine/details'
import ExperimentAnalysis from './routine/details/navigation_chart'

const ROUTES = match => [{
  path: match.url,
  exact: true,
  component: Experiments,
  title: 'Experimentos'
}, {
  path: match.url + '/:id',
  exact: true,
  component: Experiment,
  title: 'Experimento'
}, {
  path: match.url + '/:id/analysis',
  component: ExperimentAnalysis,
  title: 'Análisis'
}]

const ExperimentNavigation = ({ match }) => {
  const routes = ROUTES(match)
  return (
    <div>
      <LocalToolbar
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

export default ExperimentNavigation
