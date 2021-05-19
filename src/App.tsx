import * as React from 'react'
import { parse, Parser } from './parser'
import JSONPretty from 'react-json-pretty'
import styled, { createGlobalStyle } from 'styled-components'
import base64 from 'urlsafe-base64'
import { AstTree } from './AstTree'

const SPACING = 40;

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #282c35;
    --bg-secondary: #363c48;
    --surface: #000
  }

  html,
  body {
    margin: 0;
    padding: 0;
    color: #fff;
    background-color: var(--bg);
  }

  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const Page = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${SPACING}px ${SPACING/2}px;
  min-height: 100vh;
`

const Pannel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 ${SPACING/2}px;
  padding: ${SPACING/2}px;
  background: var(--surface);
  border-radius: 7px;

  & > * {
    margin-top: 0;
  }
`

const TextArea = styled.textarea`
  flex: 1;
  margin: 0;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 1.2rem;
  font-family: Menlo, monospace, ui-monospace;
  margin: -8px;
  padding: 8px;
`

function App() {
  let initProgram = ''
  try {
    if (typeof window !== 'undefined') {
      initProgram = base64.decode(window.location.hash).toString();
    }
  } catch(e) {}
  const [ program, setProgram ] = React.useState(initProgram)
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

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = base64.encode(Buffer.from(program, 'utf-8'))
    }
  }, [program])

  return (
    <>
      <GlobalStyles/>
      <Page>
        <Pannel>
          <h3>Program</h3>
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
              <h3>Abstract Syntax Tree</h3>
              {ast ? (
                <AstTree ast={ast}/>
              ) : null}
              {/* {d3Tree ? (
              ) : null} */}
              {/* <JSONPretty 
                data={ast} 
                theme={{
                  main: 'line-height:1.3;color:#66d9ef;overflow:auto;',
                  error: 'line-height:1.3;color:#66d9ef;overflow:auto;',
                  key: 'color:#f92672;',
                  string: 'color:#fd971f;',
                  value: 'color:#a6e22e;',
                  boolean: 'color:#ac81fe;',
                }}
              /> */}
            </>
          )}
        </Pannel>
      </Page>
    </>
  );
}

export default App;
