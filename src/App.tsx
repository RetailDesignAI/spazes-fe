import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './layout';
import './App.css';
import Home from './pages/Home/Home';
import Project from './pages/Project';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="projects/:id" element={<Project />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
