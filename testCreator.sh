cat ativos.txt > novoteste.test.ts

ativos.txt = string completa de todos os testes de ativos

testGenerator = gera string através de parametros

const testGenerator = () => {
  const objBase = [{describe:
    before?:
    after?:
    it:[
      {expect:[
        {method:'equal'}
        ]}
    ]
  }]

  objBase.forEach(({describe}) =>)
}