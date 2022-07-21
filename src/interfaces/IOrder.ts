import IAtivo from './IAtivo'

interface IOrder {
  OrdemId?: number;
  CodCliente: number;
  CodAtivo: number;
  QtdeAtivo: number;
  ValorDaOrdem?: number;
  Tipo?:string;
  Horário?: Date,
  Ativo: IAtivo;
}

export default IOrder;