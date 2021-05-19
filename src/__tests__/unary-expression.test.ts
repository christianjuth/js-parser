import { parse, Parser } from '../parser'

describe('unary-expression', () => {

  test('plus number', () => {
    const ast = parse(`+5;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '+',
          argument: {
            type: 'NumberLiteral',
            value: '5'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('minus number', () => {
    const ast = parse(`-9;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '-',
          argument: {
            type: 'NumberLiteral',
            value: '9'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('plus boolean', () => {
    const ast = parse(`+true;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '+',
          argument: {
            type: 'BooleanLiteral',
            value: 'true'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('minus boolean', () => {
    const ast = parse(`-true;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '-',
          argument: {
            type: 'BooleanLiteral',
            value: 'true'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('plus string', () => {
    const ast = parse(`+'test';`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '+',
          argument: {
            type: 'StringLiteral',
            value: 'test'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('minus string', () => {
    const ast = parse(`-'test';`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '-',
          argument: {
            type: 'StringLiteral',
            value: 'test'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('plus null', () => {
    const ast = parse(`+null;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '+',
          argument: {
            type: 'NullLiteral'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('minus null', () => {
    const ast = parse(`+null;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '+',
          argument: {
            type: 'NullLiteral'
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('recursive', () => {
    const ast = parse(`++++5;`)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'UnaryExpression',
          operator: '+',
          argument: {
            type: 'UnaryExpression',
            operator: '+',
            argument: {
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'UnaryExpression',
                operator: '+',
                argument: {
                  type: 'NumberLiteral',
                  value: '5'
                }
              }
            }
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

})