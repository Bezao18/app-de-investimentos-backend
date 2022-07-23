
const testGenerator = () => {
  const describeObj: IDescribe[] = [
    {
      description:'',
      before: '',
      it:[
        {description:'', expect: 'statusCode', toBe: 'equal', to: '200' },
        {description:'', expect: 'variavel1', toBe: 'notEqual', to: null },
        {description:'', expect: 'função1', toBe: 'instanced', with: 'parametros' }
    ],
      after: '',
    },
  ]  /* Será passado nos parametros */
}

interface IDescribe {
  description: string;
  before?: string;
  after?: string;
  it: ITest[];
}

interface ITest {
  description:string;
  expect: string;
  toBe: Methods;
  to?: any;
  with?: string;
}

type Methods = 'equal' | 'notEqual' | 'instanced'
