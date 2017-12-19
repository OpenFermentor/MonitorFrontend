import React from 'react'
import { Route } from 'react-router-dom'

import Toolbar from '../common/toolbar'

import Experiments from './list'
import Experiment from './details'
import ExperimentExecution from './execution'
import ExperimentReport from './report'
import ExperimentCreation from './upsert'

const ROUTES = match => [{
  path: match.url,
  exact: true,
  itemIndex: 0,
  component: Experiments,
  title: 'Experimentos'
}, {
  path: match.url + '/:id',
  exact: true,
  itemIndex: 1,
  component: Experiment,
  title: 'Experimento'
}, {
  path: match.url + '/:id/execution',
  component: ExperimentExecution,
  itemIndex: 2,
  title: 'Ejecución'
}, {
  path: match.url + '/:id/report',
  component: ExperimentReport,
  itemIndex: 2,
  title: 'Reporte'
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
