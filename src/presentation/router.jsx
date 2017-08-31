import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './dashboard'
import CreateRoutine from './routine/create_routine_container'
import UpdateRoutine from './routine/update_routine_container'
import Routines from './routine'
import RoutineDetails from './routine/details'

export default class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/routines/create' component={CreateRoutine} />
          <Route exact path='/routines/edit' component={UpdateRoutine} />
          <Route exact path='/routines' component={Routines} />
          <Route exact path='/routines/detail' component={RoutineDetails} />
        </div>
      </BrowserRouter>
    )
  }
}
