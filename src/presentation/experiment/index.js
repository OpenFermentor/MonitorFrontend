import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

import Toolbar from '../common/toolbar'

import Experiments from './list'
import Experiment from './details'
import ExperimentExecution from './execution'
import ExperimentReport from './report'
import ExperimentCreation from './upsert'
import { selectSelectedRoutine } from '../../redux/routine/selector';

const ROUTES = (match, selectedRoutine = {}) => {
  return  [{
  path: match.url,
  exact: true,
  itemIndex: 0,
  component: Experiments,
  title: 'Experimentos'
}, {
  path: `${match.url}/:id`,
  url: `${match.url}/${selectedRoutine.id}`,
  exact: true,
  itemIndex: 1,
  component: Experiment,
  title: 'Experimento'
}, {
  path: `${match.url}/:id/execution`,
  url: `${match.url}/${selectedRoutine.id}/execution`,
  component: ExperimentExecution,
  itemIndex: 2,
  title: 'Ejecución'
}, {
  path: match.url + '/:id/report',
  url: `${match.url}/${selectedRoutine.id}/report`,
  component: ExperimentReport,
  itemIndex: 2,
  title: 'Reporte'
}]
}

const ExperimentNavigation = ({ match, selectedRoutine }) => {
  const routes = ROUTES(match, selectedRoutine)
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

      <Route path={match.url} component={ExperimentCreation} />

    </div>
  )
}

const mapStateToProps = state => ({
  selectedRoutine: selectSelectedRoutine(state),
})

export default connect(mapStateToProps)(ExperimentNavigation)
