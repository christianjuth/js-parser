import { parse, Parser } from '../parser'

describe('equality', () => {

  test('equal', () => {
    const ast = parse(`
      5 == 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '==',
          left: {
            type: 'NumberLiteral',
            value: "5"
          },
          right: {
            type: 'NumberLiteral',
            value: "4"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('not equal 1', () => {
    const ast = parse(`
      5 != 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '!=',
          left: {
            type: 'NumberLiteral',
            value: "5"
          },
          right: {
            type: 'NumberLiteral',
            value: "4"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('not equal 2', () => {
    const ast = parse(`
      true != false;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '!=',
          left: {
            type: 'BooleanLiteral',
            value: "true"
          },
          right: {
            type: 'BooleanLiteral',
            value: "false"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

})