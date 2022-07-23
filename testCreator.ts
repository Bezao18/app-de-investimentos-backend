
const testGenerator = () => {
  const describeObj: any = [
    {
      before: '',
      it:[
        { expect: 'statusCode', toBe: 'equal', to: '200' },
        { expect: 'variavel1', toBe: 'notEqual', to: null },
        { expect: 'função1', toBe: 'instanced', with: 'parametros' }
    ],
      after: '',
    },
  ]  /* Será passado nos parametros */
}

interface IDescribe {
  before?: string;
  after?: string;
  it: ITest[];
}



interface ITest {
  expect: string;
  toBe: string;
  to?: string;
  with?: string;
}

type Methods = 'equal' | 'notEqual' | 'instanced'
