import { parse, Parser } from '../parser'

describe('literals', () => {
  test('null', () => {
    const ast = parse(`
      null;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'NullLiteral'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('string', () => {
    const ast = parse(`
      "test";
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

  test('number', () => {
    const ast = parse(`
      999;
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: [
        {
          type: 'NumberLiteral',
          value: '999'
        }
      ]
    }
    expect(ast).toEqual(tree);
  });

  test('boolean', () => {
    const ast = parse(`
      true;
      false;
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

})