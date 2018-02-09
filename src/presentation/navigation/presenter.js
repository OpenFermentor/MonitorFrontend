import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'
import Container from '../common/container'
import { Grid, Dropdown } from 'semantic-ui-react'

const MainNavigation = ({ routes, currentUser, showUserMenu, onSignOut }) => (
  <div className='mainNavigation'>
    <Container center noPadding>
      <Grid>
        <Grid.Column width={4}>
          <h3 className='title'>OpenFermentor</h3>
        </Grid.Column>

        { routes.map(({ title, exact, path }, index) => (
          <Grid.Column width={4} key={index}>
            <NavLink
              to={path}
              exact={exact}
              activeClassName='active'
            >
              {title}
            </NavLink>
          </Grid.Column>
        ))}

        { showUserMenu &&
          <Grid.Column width={4}>
            <Dropdown
              text={currentUser.firstName + ' ' + currentUser.lastName}
              floating
              closeOnChange
              options={[{ key: 1, text: 'Cerrar sesión' }]}
              onChange={onSignOut}
            />
          </Grid.Column>
        }

      </Grid>
    </Container>
  </div>
)

export default MainNavigation
