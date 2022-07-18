interface IOrder {
  OrdemId: number;
  CodCliente: number;
  CodAtivo: number;
  QtdeAtivo: number;
  ValorPago: number;
  Tipo:string;
  Horário: Date,
}

export default IOrder;