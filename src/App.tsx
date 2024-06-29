import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './layout';
import Home from './pages/Home/Home';
import Project from './pages/Project';
import Projects from './pages/Projects';
import { AppRoutes } from './lib/constants/routes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.Home} element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={AppRoutes.Project} element={<Project />} />
          <Route path={AppRoutes.Projects} element={<Projects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
