import React from 'react'
import { Route } from 'react-router-dom'

import Toolbar from '../common/toolbar'

import Experiments from './list'
import Experiment from './details'
import ExperimentAnalysis from './analysis'
import ExperimentCreation from './upsert'

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

      <Route path={match.url} component={ExperimentCreation} />

    </div>
  )
}

export default ExperimentNavigation
