import { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusTextMap: Record<string, string> = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

const statusColorMap: Record<string, string> = {
  pending: '#E52B1A',
  done: '#00CCCC',
  created: '#F2F2F3'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => (
  <OrderStatusUI
    textStyle={statusColorMap[status] || '#F2F2F3'}
    text={statusTextMap[status] || status}
  />
);
