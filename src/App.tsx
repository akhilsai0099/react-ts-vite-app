import Form from './Components/Form'
import Posts from './Components/Posts'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </Router>
  )
}
export default App;
