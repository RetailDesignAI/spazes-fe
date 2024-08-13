import AppLayout from './layout';
import Home from './pages/Home';
import Project from './pages/Project';
import Projects from './pages/Projects';
import AuthPage from './pages/Auth';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import { AppRoutes } from './lib/constants/routes';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
        <Route path={AppRoutes.Auth} element={<AuthPage />}>
          <Route index element={<Navigate to={AppRoutes.Signup} />} />
          <Route path={AppRoutes.Signup} element={<Signup />} />
          <Route path={AppRoutes.Login} element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
