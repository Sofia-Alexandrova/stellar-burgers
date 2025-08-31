import React, { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorState,
  getOrderRequest,
  getOrderModalData,
  resetModal,
  setRequest,
  getOrderBurger
} from '../../services/slices/burger-constructor';
import { getUserData } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorState);
  const orderModalData = useSelector(getOrderModalData);
  const orderRequest = useSelector(getOrderRequest);
  const isAuthenticated = useSelector(getUserData).isAuthenticated;

  const onOrderClick = () => {
    if (!constructorItems.bun) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(setRequest(true));
    dispatch(getOrderBurger(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(setRequest(false));
    dispatch(resetModal());
  };

  const price = useMemo(() => {
    const { ingredients, bun } = constructorItems;
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  const orderIngredients = useMemo(() => {
    const { ingredients, bun } = constructorItems;
    const ingredientIds = ingredients.map((i: TConstructorIngredient) => i._id);
    return bun ? [bun._id, ...ingredientIds, bun._id] : [];
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
