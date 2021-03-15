import { parse, Parser } from '../parser'

describe('statement', () => {

  test('single line', () => {
    const ast = parse(`5;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'NumberLiteral',
          value: '5'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('single statement', () => {
    const ast = parse(`
      "one";
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'StringLiteral',
          value: 'one'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('multiple statements', () => {
    const ast = parse(`
      "one";
      "two";
      "three";
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'StringLiteral',
          value: 'one'
        },
        {
          type: 'StringLiteral',
          value: 'two'
        },
        {
          type: 'StringLiteral',
          value: 'three'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

})