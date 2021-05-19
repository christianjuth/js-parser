import * as React from 'react'
import styled from 'styled-components'
import Tree, { } from 'react-d3-tree';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common'
import { Parser } from './parser'

const Styles = styled.div`
  & .rd3t-node {
    && {
      fill: #fff;
      stroke: #3498db;
    }
  }

  & .rd3t-link {
    && {
      stroke: #3498db;
    }
  }

  & .rd3t-label__title {
    && {
      stroke: #fff;
    }
  }
`

function astToD3(tree: Parser.Tokens): RawNodeDatum | null {
  if (tree === null) {
    return null
  } 

  else if (Array.isArray(tree)) {
    const children: Array<RawNodeDatum> = []

    for (const node of tree) {
      const child = astToD3(node)
      if (child !== null) {
        children.push(child)
      }
    }

    return {
      name: 'StatementList',
      children
    }
  } 

  else {
    const children: Array<RawNodeDatum> = [];

    const keys: Array<keyof Pick<Parser.Token, (
      'left' | 'right' | 'body' | 'argument'
    )>> = [
      'left', 'right', 'body', 'argument'
    ]

    keys.forEach(key => {
      const child = tree[key];
      const childNode = child ? astToD3(child) : null
      if (childNode) {
        children.push(childNode)
      }
    })

    return {
      name: tree.type,
      attributes: {
        ...(tree.value ? {
          value: tree.value
        } : {}),
        ...(tree.operator ? {
          operator: tree.operator
        } : {})
      },
      children
    } 
  }
}

export function AstTree({
  ast
}: {
  ast: Parser.Tokens
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  const data = astToD3(ast)

  React.useEffect(() => {
    const div = ref.current
    if (div === undefined) {
      return
    }
    function handleResize() {
      setWidth(div?.offsetWidth ?? 0)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Styles ref={ref}>
      {data ? (
        <Tree
          data={data}
          orientation='vertical'
          translate={{
            x: width/2,
            y: 50
          }}
        />
      ) : null}
    </Styles>
  )
}