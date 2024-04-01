import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from './Components/Nav'
import Create from './Views/Heroes/Create'
import Heroes from './Views/Heroes/index'
import Edit from './Views/Heroes/Edit'
import cors from "cors";


function App() {

  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Heroes/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
    </BrowserRouter>
  )
} 

export default App
