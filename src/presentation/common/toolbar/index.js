import React from 'react'
import { NavLink } from 'react-router-dom'
import { matchPath, withRouter } from 'react-router'
import { Grid } from 'semantic-ui-react'
import Button from '../button'
import './styles.css'

import Container from '../container'

const matchedBreadcumbIndex = (location, breadcrumb) =>
  breadcrumb.find(({ path, exact }) => matchPath(location.pathname, { path, exact }))

const Toolbar = ({ match, location, title, breadcrumb = [], actions = [] }) => {
  const matchedItem = matchedBreadcumbIndex(location, breadcrumb)
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
            breadcrumb.map(({ url, path, title, itemIndex }) => {
              if (itemIndex > matchedItem.itemIndex) {
                return null
              }
              if (itemIndex === matchedItem.itemIndex && title !== matchedItem.title) {
                return null
              }
              return (
                <Grid.Column width={3} key={itemIndex}>
                  <NavLink
                    to={url || path}
                    isActive={() => itemIndex === matchedItem.itemIndex}
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
          { actions.map(({ title, onClick }, index) =>
            <Button primary onClick={onClick}>{title}</Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default withRouter(Toolbar)
