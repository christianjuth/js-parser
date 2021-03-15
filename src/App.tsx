import * as React from 'react'
import { parse, Parser } from './parser'
import JSONPretty from 'react-json-pretty'
import styled from 'styled-components'

const SPACING = 40;

const Page = styled.div`
  background: #000;
  display: flex;
  flex-direction: row;
  padding: ${SPACING}px ${SPACING/2}px;
  min-height: 100vh;

  &, * {
    box-sizing: border-box;
    color: #fff;
    font-family: Menlo, monospace, ui-monospace;
  }
`

const Pannel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 ${SPACING/2}px;
`

const TextArea = styled.textarea`
  flex: 1;
  margin: 0;
  padding: ${SPACING/2}px;
  background-color: transparent;
  color: #fff;
  border-radius: 7px;
  font-size: 1rem;
`

function App() {
  const [ program, setProgram ] = React.useState('')
  const [ error, setError ] = React.useState(null)
  const [ ast, setAst ] = React.useState<Parser.Tokens>(null)

  React.useEffect(() => {
    try {
      const tree = parse(program)
      setAst(tree)
      setError(null)
    } catch(e) {
      setError(e.toString())
    }
  }, [program])

  return (
    <Page>
      <Pannel>
        <TextArea
          value={program}
          onChange={e => setProgram(e.target.value)}
          placeholder='"hello world";'
        />
      </Pannel>
      <Pannel>
        {error ? (
          <h3>{error}</h3>
        ) : (
          <>
            <h3>Parse Tree</h3>
            <JSONPretty 
              data={ast} 
              theme={{
                main: 'line-height:1.3;color:#66d9ef;overflow:auto;',
                error: 'line-height:1.3;color:#66d9ef;overflow:auto;',
                key: 'color:#f92672;',
                string: 'color:#fd971f;',
                value: 'color:#a6e22e;',
                boolean: 'color:#ac81fe;',
              }}
            />
          </>
        )}
      </Pannel>
    </Page>
  );
}

export default App;
