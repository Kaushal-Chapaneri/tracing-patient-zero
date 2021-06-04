import React, { useState } from 'react'
import Graph from 'react-graph-vis'
import { useQuery, gql } from '@apollo/client'

const GET_USER = gql`
  query {
    users {
      id
      infected_by
      level
    }
  }
`
var tp = null

function Tracing() {
  const { loading, error, data } = useQuery(GET_USER)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  console.log(data)

  const createEdge = (x) => {
    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1
      return {
        graph: {
          nodes: [...nodes],
          edges: x.concat(...edges),
        },
        counter: id,
        ...rest,
      }
    })
  }

  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: data.users.map((row) => ({ id: row.id, label: `${row.id}` })),
      edges: [],
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log(edges)
        const arr1 = data.users.filter((d) => d.id == nodes[0])
        const arr2 = data.users.filter(
          (e) => e.infected_by == arr1[0].infected_by
        )
        const arr3 = arr2.map((row2) => ({
          from: row2.infected_by,
          to: row2.id,
          value: row2.level,
        }))
        tp = arr3
      },
      doubleClick: () => {
        createEdge(tp)
      },
    },
  })

  const { graph, events } = state
  console.log(graph)

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
    },
    height: '500px',
  }

  return <Graph graph={graph} options={options} events={events} />
}

export default Tracing
