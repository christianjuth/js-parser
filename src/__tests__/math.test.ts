import { parse, Parser } from '../parser'

describe('math', () => {
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

  test('mixed addition and subtraction', () => {
    const ast = parse(`
      1 + 2 - 3;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '-',
          left: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumberLiteral',
              value: "1"
            },
            right: {
              type: 'NumberLiteral',
              value: "2"
            }
          },
          right: {
            type: 'NumberLiteral',
            value: "3"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  })

  test('mixed addition and multiplication', () => {
    const ast = parse(`
      1 + 2 * 3;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '+',
          left: {
            type: 'NumberLiteral',
            value: "1"
          },
          right: {
            type: 'BinaryExpression',
            operator: '*',
            left: {
              type: 'NumberLiteral',
              value: "2"
            },
            right: {
              type: 'NumberLiteral',
              value: "3"
            }
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  })

  test('parentheses order of operations 1', () => {
    const ast = parse(`
      (1 + 2) * 3;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '*',
          left: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumberLiteral',
              value: "1"
            },
            right: {
              type: 'NumberLiteral',
              value: "2"
            }
          },
          right: {
            type: 'NumberLiteral',
            value: "3"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  })

  test('parentheses order of operations 2', () => {
    const ast = parse(`
      (1 - 2) / 3;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '/',
          left: {
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'NumberLiteral',
              value: "1"
            },
            right: {
              type: 'NumberLiteral',
              value: "2"
            }
          },
          right: {
            type: 'NumberLiteral',
            value: "3"
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  })

  test('equality order of operations 1', () => {
    const ast = parse(`
      1 + 2 == 3 + 4;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BinaryExpression',
          operator: '==',
          left: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumberLiteral',
              value: "1"
            },
            right: {
              type: 'NumberLiteral',
              value: "2"
            }
          },
          right: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'NumberLiteral',
              value: "3"
            },
            right: {
              type: 'NumberLiteral',
              value: "4"
            }
          }
        }
      ]
    }
    expect(ast).toEqual(tree);
  })

})