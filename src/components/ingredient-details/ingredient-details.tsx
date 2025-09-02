import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Params, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientData } from '../../services/slices/ingredients';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<Params>();
  const { ingredients, loading, error } = useSelector(getIngredientData);

  const ingredientData = ingredients.find((i) => {
    if (i._id === id) {
      return i;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
