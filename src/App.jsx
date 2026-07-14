import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Assignment1  from './assignments/Assignment1';
import Assignment2 from './assignments/Assignment2';
import Assignment3 from './assignments/Assignment3';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Assignment1 />}/>
          <Route path="/assignment2" element={<Assignment2 />}/>
           <Route path="/assignment3" element={<Assignment3 />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
