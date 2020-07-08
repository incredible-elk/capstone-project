import React, { useReducer } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import MealplanListItem from './MealplanListItem'
import MealplanTitle from './MealplanTitle'
import { AddButton } from './Button'

const mealReducer = (state, action) => {
  switch (action.type) {
    case 'DO_MEAL':
      return {
        ...state,
        items: state.items.map((meal) => {
          if (meal.id === action.id) {
            return { ...meal, done: true }
          } else {
            return meal
          }
        }),
      }
    case 'UNDO_MEAL':
      return {
        ...state,
        items: state.items.map((meal) => {
          if (meal.id === action.id) {
            return { ...meal, done: false }
          } else {
            return meal
          }
        }),
      }
    case 'RENAME_MEAL':
      return {
        ...state,
        items: state.items.map((meal) => {
          if (meal.id === action.id) {
            return { ...meal, item: action.value }
          } else {
            return meal
          }
        }),
      }
    case 'RENAME_TITLE':
      return { ...state, title: action.value }

    case 'CREATE_MEAL':
      return {
        ...state,
        items: [...state.items, { id: uuidv4(), item: '', done: false }],
      }

    default:
      return state
  }
}

export default function MealplanList({ mealplanList }) {
  const [list, dispatch] = useReducer(mealReducer, mealplanList)

  const handleChange = (meal) => {
    dispatch({
      type: meal.done ? 'UNDO_MEAL' : 'DO_MEAL',
      id: meal.id,
    })
  }

  const handleInputChange = (meal, value) => {
    dispatch({
      type: 'RENAME_MEAL',
      id: meal.id,
      value: value,
    })
  }

  const handleTitleChange = (value) => {
    dispatch({
      type: 'RENAME_TITLE',
      value: value,
    })
  }

  const handleAddItemClick = () => {
    dispatch({
      type: 'CREATE_MEAL',
    })
  }

  return (
    <>
      <StyledMealplanList>
        <MealplanTitle
          value={list.title}
          onChange={(event) => handleTitleChange(event.target.value)}
        />
        <ul>
          {list.items.map((meal) => (
            <MealplanListItem
              checked={meal.done}
              key={meal.id}
              onCheckedChange={() => handleChange(meal)}
              onValueChange={(event) =>
                handleInputChange(meal, event.target.value)
              }
              value={meal.item}
            />
          ))}
        </ul>
      </StyledMealplanList>
      <AddButton onClick={() => handleAddItemClick()}>Add item</AddButton>
    </>
  )
}

const StyledMealplanList = styled.div`
  display: flex;
  flex-direction: column;
`