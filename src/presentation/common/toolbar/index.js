import React from 'react'
import { NavLink } from 'react-router-dom'
import { matchPath, withRouter } from 'react-router'
import { Grid } from 'semantic-ui-react'
import Button from '../button'
import './styles.css'

import Container from '../container'

const matchedBreadcumbIndex = (location, breadcrumb) =>
  breadcrumb.findIndex(({ path, exact }) => matchPath(location.pathname, { path, exact }))

const Toolbar = ({ match, location, title, breadcrumb = [], rightActionTitle, onClickRightAction }) => {
  const matchedIndex = matchedBreadcumbIndex(location, breadcrumb)
  return (
    <div className='localToolbar'>
      <Container center row>
        <Grid>
          { title &&
            <Grid.Column width={6}>
              <h3>{title}</h3>
            </Grid.Column>
          }
          { breadcrumb &&
            breadcrumb.map(({ path, title }, index) => {
              if (index > matchedIndex) {
                return null
              }
              return (
                <Grid.Column width={3} key={index}>
                  <NavLink
                    to={path}
                    isActive={() => index === matchedIndex}
                    activeClassName='active'
                  >
                    {title}
                  </NavLink>
                </Grid.Column>
              )
            })
          }
        </Grid>
        <div className='actions'>
          { rightActionTitle && onClickRightAction &&
            <Button primary onClick={onClickRightAction}>{rightActionTitle}</Button>
          }
        </div>
      </Container>
    </div>
  )
}

export default withRouter(Toolbar)
