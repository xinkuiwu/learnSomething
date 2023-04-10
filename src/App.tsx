import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import create from 'zustand'
import * as React from 'react'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import styled from '@emotion/styled'
import ReactFlow,{ MiniMap,Controls, Background, useNodesState, useEdgesState, addEdge} from 'reactflow'
import 'reactflow/dist/style.css';

const initialNodes = [
  {id:'1', position:{x:0, y:0}, data: {label: '1'}},
  {id:'2', position:{x:0, y:100}, data: {label: '2'}}
]
const initialEdges = [
  {id:'e1-2', source: '1', target: '2'}
]

const color = 'white'

const Button2 = styled.button`
color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
`

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
];
const useStore = create((set,get) =>({
  votes: 0,
  addVotes: () => set(state =>({votes:state.votes + 1})),
  subtractVotes: () => set(state => ({ votes: state.votes - 1 })),
  action: () => {
    // 使用 get()
    const userVotes = get().votes
  }
}))

function App() {
  // zustand
  const [count, setCount] = useState(0)
  const getVotes = useStore(state => state.votes);
  const addVotes = useStore(state => state.addVotes);
const subtractVotes = useStore(state => state.subtractVotes);

// react flow
 const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
 const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

 const onConnect = useCallback(params => setEdges(eds=> addEdge(params,eds)), [setEdges])

const css2 =css`
padding:32px;
background-color: hotpink;
font-size: 24px;
border-radius:4px;
&:hover{
  color: ${color}
}
`
  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh' }} >
        <ReactFlow 
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        >
         <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <Button2>This my button component.</Button2>
      <div css={css2}>
        hover to change color
      </div>
      <Autocomplete  disablePortal
  id="combo-box-demo"
  options={top100Films}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie" />}></Autocomplete>
      <Button variant='outlined'>Hello world</Button>
      <div>
      <h1>{getVotes} people have cast their votes</h1>
      <button onClick={addVotes}>Cast a vote</button>
      <button onClick={subtractVotes}>Delete a vote</button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
