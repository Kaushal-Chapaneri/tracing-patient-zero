import React from 'react'
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

function Network() {
  const { loading, error, data } = useQuery(GET_USER)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  console.log(data)

  const ls_nodes = data.users.map((row) => ({
    id: row.id,
    label: `${row.id}`,
    group: row.level,
  }))
  const ls_edges = data.users.map((row) => ({
    from: row.infected_by,
    to: row.id,
    value: row.level,
  }))

  console.log(ls_edges)

  const graph = {
    nodes: ls_nodes,
    edges: ls_edges,
  }

  const options = {
    layout: {
      hierarchical: false,
      levelSeparation: 160,
      nodeSpacing: 50,
    },
    edges: {
      color: '#000000',
      shadow: true,
    },
    nodes: {
      borderWidth: 2,
      shadow: true,
    },
    height: '500px',
  }

  const events = {
    select: function (event) {
      var { nodes, edges } = event
      console.log(nodes)
      console.log(edges)
    },
  }

  return <Graph graph={graph} options={options} events={events} />
}

export default Network
