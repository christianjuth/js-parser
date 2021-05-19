export declare namespace Parser {
  type LiteralTerminals = 'NUMBER' | 'STRING' | 'NULL' | 'BOOLEAN'
  type OperatorTerminals = 'ADDITIVE_OPERATOR' | 'MULTIPLICATIVE_OPERATOR' | 'EQUALITY_OPERATOR' | 'GREATER_THAN_OPERATOR' | 'RELATIONAL_OPERATOR' | 'LOGICAL_NOT'
  type SymbolTerminals = ';' | '(' | ')'
  export type Terminal = LiteralTerminals | OperatorTerminals | SymbolTerminals

  type TokenTypes = 'BooleanLiteral' | 'NumberLiteral' | 'StringLiteral' | 'NullLiteral' | 'BinaryExpression' | 'Program' | 'UnaryExpression'

  export type Tokens = Token | Array<Tokens> | null

  export type Token = {
    type: TokenTypes
    value?: string
    operator?: string
    body?: Tokens
    left?: Tokens
    right?: Tokens
    argument?: Tokens
  }

  export type ParseFn = (t: Tokenizer) => Tokens

  export type Lookahead = null | {
    type: string
    value: string
    index: number
  }
}

const SPEC: Array<[RegExp, Parser.Terminal | null]> = [
  // Whitespace
  [/^\s+/, null],

  // Comments
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*/, null],

  // Operator
  [/^(\+|-)/, 'ADDITIVE_OPERATOR'],
  [/^(\*|\/)/, 'MULTIPLICATIVE_OPERATOR'],
  [/^(=|!)=/, 'EQUALITY_OPERATOR'],
  [/^(>|<)(=|)/, 'RELATIONAL_OPERATOR'],

  // Logical
  [/^!/, 'LOGICAL_NOT'],

  //
  [/^;/, ';'],
  [/^\(/, '('], 
  [/^\)/, ')'], 

  // Numbers
  [/^\d+/, 'NUMBER'],


  // Strings
  [/^"[^"]*"/, 'STRING'],
  [/^'[^']*'/, 'STRING'],

  // Other literals
  [/^null/, 'NULL'],
  [/^(true|false)/, 'BOOLEAN']
]

class Tokenizer {
  private _program: string
  private _cursor: number

  constructor(program: string) {
    this._program = program
    this._cursor = 0
  }

  EOF(shift = 0) {
    return this._cursor + shift >= this._program.length
  }

  lookahead(shift = 0): Parser.Lookahead {
    if (this.EOF(shift)) {
      return null
    }

    const program = this._program.slice(this._cursor + shift)

    for(const [regex, tokenType] of SPEC) {
      const matches = regex.exec(program)
      if (matches === null) {
        continue;
      }
  
      const token = matches[0]
      if (tokenType === null) {
        return this.lookahead(shift + token.length);
      }
  
      return {
        type: tokenType,
        value: token,
        index: this._cursor + shift 
      }
    }
  
    throw new SyntaxError(
      `Unexpected token ${program[0]}`
    )
  }

  eat(tokenType: Parser.Terminal) {
    const token = this.lookahead()

    if (token === null) {
      throw new SyntaxError(
        `Unexpected end of input, expected: "${tokenType}"`
      )
    }
  
    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token "${token.type}", expected: "${tokenType}"`
      )
    }

    this._cursor = token.index + token.value.length
    return {
      value: token.value
    }
  }
}

//
/**
 * Functions below are defined in reverse order.
 * Start at the parse function at the very bottom
 * and work your way up to the function directly below.
 */
//

const NumberLiteral: Parser.ParseFn = (t) => {
  const token = t.eat('NUMBER')
  return {
    type: 'NumberLiteral',
    value: token.value
  }
}

const StringLiteral: Parser.ParseFn = (t) => {
  const token = t.eat('STRING')
  return {
    type: 'StringLiteral',
    value: token.value.slice(1, -1)
  }
}

const NullLiteral: Parser.ParseFn = (t) => {
  t.eat('NULL')
  return {
    type: 'NullLiteral'
  }
}

const BooleanLiteral: Parser.ParseFn = (t) => {
  const token = t.eat('BOOLEAN')
  return {
    type: 'BooleanLiteral',
    value: token.value
  }
}

const Literal: Parser.ParseFn = (t) => {
  const token = t.lookahead()
  switch (token?.type) {
    case 'NUMBER':
      return NumberLiteral(t)
    case 'STRING':
      return StringLiteral(t)
    case 'NULL':
      return NullLiteral(t)
    case 'BOOLEAN':
      return BooleanLiteral(t)
  }
  return null
}

const Parentheses: Parser.ParseFn = (t) => {
  if (t.lookahead()?.type === '(') {
    t.eat('(')
    const output = AdditiveExpression(t)
    t.eat(')')
    return output
  }
  return Literal(t)
}

const buildBinaryExpression = (type: Parser.Terminal, fn: Parser.ParseFn): Parser.ParseFn => {
  return (t: Tokenizer) => {
    let left = fn(t)

    while (t.lookahead()?.type === type) {
      const operator = t.eat(type)
      const right = fn(t)

      left = {
        type: 'BinaryExpression',
        operator: operator.value,
        left,
        right
      }
    }

    return left
  }
}

const UnaryExpression: Parser.ParseFn = (t) => {
  const lookahead = t.lookahead();

  switch (lookahead?.type) {
    case 'ADDITIVE_OPERATOR':
      return {
        type: 'UnaryExpression',
        operator: t.eat('ADDITIVE_OPERATOR').value,
        argument: UnaryExpression(t)
      }
    case 'LOGICAL_NOT':
      return {
        type: 'UnaryExpression',
        operator: t.eat('LOGICAL_NOT').value,
        argument: UnaryExpression(t)
      }
  }

  return Parentheses(t)
}

const MultiplicativeExpression = buildBinaryExpression('MULTIPLICATIVE_OPERATOR', UnaryExpression)
const AdditiveExpression = buildBinaryExpression('ADDITIVE_OPERATOR', MultiplicativeExpression)
const EqualityExpression = buildBinaryExpression('EQUALITY_OPERATOR', AdditiveExpression)

const RelationalExpression = buildBinaryExpression('RELATIONAL_OPERATOR', EqualityExpression)

const Statement: Parser.ParseFn = (t) => {
  const output = []
  let lookahead = t.lookahead()
  while (lookahead !== null) {
    if (lookahead.type !== ';') {
      output.push(RelationalExpression(t));
    }
    t.eat(';')
    lookahead = t.lookahead()
  }
  return output
}

const Program: Parser.ParseFn = (t) => {
  return {
    type: 'Program',
    body: Statement(t)
  }
}

export const parse = (program: string) => {
  const tokenizer = new Tokenizer(program)
  return Program(tokenizer)
}