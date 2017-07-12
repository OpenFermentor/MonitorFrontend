import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from './dashboard/dashboard_container'
import CreateRoutine from './routine/create_routine_container'
import UpdateRoutine from './routine/update_routine_container'

export default class Router extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' component={Dashboard} />
          <Route path='/routines/create' component={CreateRoutine} />
          <Route path='/routines/edit' component={UpdateRoutine} />
        </div>
      </BrowserRouter>
    )
  }
}
