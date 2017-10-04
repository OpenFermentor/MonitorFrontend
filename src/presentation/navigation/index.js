import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'
import Container from '../common/container'
import { Grid } from 'semantic-ui-react'

const MainNavigation = ({ routes }) => (
  <div className='mainNavigation'>
    <Container center noPadding>
      <Grid>
        <Grid.Column width={4}>
          <h3 className='title'>OpenFermentor</h3>
        </Grid.Column>

        { routes.map(({ title, exact, path }, index) => (
          <Grid.Column width={4}>
            <NavLink
              key={index}
              to={path}
              exact={exact}
              activeClassName='active'
            >
              {title}
            </NavLink>
          </Grid.Column>
        ))}

        <Grid.Column width={4}>
          <div />
        </Grid.Column>

      </Grid>
    </Container>
  </div>
)

export default MainNavigation
