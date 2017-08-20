import React from 'react'
import Icon from '../../icon'
import { Button } from 'semantic-ui-react'

const IconButton = ({ name, color, onClick }) => (
  <Button basic onClick={onClick}>
    <Icon name={name} color={color} />
  </Button>
)

export default IconButton
