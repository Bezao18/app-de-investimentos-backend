import IOrder from './IOrder'

interface IOrderHistory {
  buyOrders: IOrder[];
  sellOrders: IOrder[]
}

export default IOrderHistory;