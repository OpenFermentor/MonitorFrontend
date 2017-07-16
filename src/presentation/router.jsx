import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Sidebar from './sidebar'
import { Grid } from 'semantic-ui-react'

import Dashboard from './dashboard/dashboard_container'
import RoutineSelection from './routine/routine_selection_container'
import CreateRoutine from './routine/create_routine_container'
import UpdateRoutine from './routine/update_routine_container'
import RoutineCollection from './routine/routine_collection_container'
import RoutineDetails from './routine/routine_details_container'

export default class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <Grid stretched>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Route path='/' component={Dashboard} />
            <Route path='/routines/select' component={RoutineSelection} />
            <Route path='/routines/create' component={CreateRoutine} />
            <Route path='/routines/edit' component={UpdateRoutine} />
            <Route path='/routines' component={RoutineCollection} />
            <Route path='/routines/details/:id' component={RoutineDetails} />
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    )
  }
}
