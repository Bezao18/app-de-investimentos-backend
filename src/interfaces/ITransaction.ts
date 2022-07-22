interface ITransaction {
  CodCliente: number;
  Valor: number;
  Tipo?: string;
  Horario?: Date;
}

export default ITransaction;