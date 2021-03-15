import { parse, Parser } from '../parser'

describe('statement', () => {
  test('single line comment', () => {
    const ast = parse(`
      // this is a test
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: []
    }
    expect(ast).toEqual(tree);
  });

  test('multi line comment', () => {
    const ast = parse(`
      /* 
       * this 
       * is 
       * a 
       * test
       */
    `)
    const tree: Parser.Token = {
      type: 'Program',
      body: []
    }
    expect(ast).toEqual(tree);
  });

})