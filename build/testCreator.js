"use strict";
const testGenerator = () => {
    const describeObj = [
        {
            description: '',
            before: '',
            it: [
                { description: '', expect: 'statusCode', toBe: 'equal', to: '200' },
                { description: '', expect: 'variavel1', toBe: 'notEqual', to: null },
                { description: '', expect: 'função1', toBe: 'instanced', with: 'parametros' }
            ],
            after: '',
        },
    ]; /* Será passado nos parametros */
};
