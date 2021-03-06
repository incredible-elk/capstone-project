import React from 'react'
import MealplanListItem from './MealplanListItem'
import { action } from '@storybook/addon-actions'

export default {
  component: MealplanListItem,
  title: 'MealplanListItem',
}

export const Empty = () => (
  <MealplanListItem
    onValueChange={action('value-change')}
    onCheckedChange={action('checkbox-change')}
    onKeyDownEnter={action('keydown-enter')}
    value=""
  />
)

export const Unchecked = () => (
  <MealplanListItem
    onValueChange={action('value-change')}
    onCheckedChange={action('checkbox-change')}
    onKeyDownEnter={action('keydown-enter')}
    value="Burritos"
  />
)

export const Checked = () => (
  <MealplanListItem
    onValueChange={action('value-change')}
    onCheckedChange={action('checkbox-change')}
    onKeyDownEnter={action('keydown-enter')}
    value="Burritos"
    checked
  />
)
