import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getIngredientData } from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';
import { getOrderByNumber, getOrderData } from '../../services/slices/order';
import { useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';

export const formatOrderNumber = (path: string): string => {
  const orderNumber = path.split('/').pop() || '';
  return `#${orderNumber.padStart(6, '0')}`;
};

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { getOrderByNumberResponse, request } = useSelector(getOrderData);
  const dispatch = useDispatch();
  const number = Number(useParams().number);

  /* Готовим данные для отображения */
  const { ingredients } = useSelector(getIngredientData);
  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, []);
  const orderInfo = useMemo(() => {
    if (!getOrderByNumberResponse || !ingredients.length) return null;

    const date = new Date(getOrderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = getOrderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...getOrderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [getOrderByNumberResponse, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
