import { parse, Parser } from '../parser'

describe('binary-expression', () => {
  test('addition', () => {
    const ast = parse(`
      5 + 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '+',
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

  test('subtraction', () => {
    const ast = parse(`
      5 - 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '-',
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

  test('multiplication', () => {
    const ast = parse(`
      5 * 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '*',
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

  test('division', () => {
    const ast = parse(`
      5 / 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '/',
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

  test('recursive addition', () => {
    const ast = parse(`
      1 + 2 + 3 + 4;
    `)
    const tree: Parser.Token = {
      "type": "Program",
      "body": [
        {
          "type": "BinaryExpression",
          "operator": "+",
          "left": {
            "type": "BinaryExpression",
            "operator": "+",
            "left": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                "type": "NumberLiteral",
                "value": "1"
              },
              "right": {
                "type": "NumberLiteral",
                "value": "2"
              }
            },
            "right": {
              "type": "NumberLiteral",
              "value": "3"
            }
          },
          "right": {
            "type": "NumberLiteral",
            "value": "4"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  })

})