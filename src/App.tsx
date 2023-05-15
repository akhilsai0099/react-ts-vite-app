import Page1 from './Pages/Page1'
import Page2 from './Pages/Page2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path='/posts' element={<Page2 />} />
      </Routes>
    </Router>
  )
}
export default App;
