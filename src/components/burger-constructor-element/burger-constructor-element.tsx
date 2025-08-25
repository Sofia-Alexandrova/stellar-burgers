import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  IngridientShiftDown,
  IngridientShiftUp,
  removeIngredientConstructor
} from '../../services/slices/burger-constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(IngridientShiftDown(ingredient.id));
    };

    const handleMoveUp = () => {
      dispatch(IngridientShiftUp(ingredient.id));
    };

    const handleClose = () => {
      dispatch(removeIngredientConstructor(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
