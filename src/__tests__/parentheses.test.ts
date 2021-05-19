import { parse, Parser } from '../parser'

describe('parentheses', () => {

  test('number', () => {
    const ast = parse(`
      (5);
    `)
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

  test('string', () => {
    const ast = parse(`
      ('test');
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'StringLiteral',
          value: 'test'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('boolean', () => {
    const ast = parse(`
      (true);
      (false);
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'BooleanLiteral',
          value: 'true'
        },
        {
          type: 'BooleanLiteral',
          value: 'false'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('Recursive', () => {
    const ast = parse(`
      (((((('test'))))));
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'StringLiteral',
          value: 'test'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });
})