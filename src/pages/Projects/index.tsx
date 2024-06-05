import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { fadeAnimation } from '@/lib/animations';
import { Project } from './projects.types';
import ProjectsSearch from './ProjectsSearch';

export default function Projects() {
  const [projects] = useState([
    {
      id: 1,
      name: 'Acme Website',
      description: 'A modern and responsive website for Acme Inc.',
      images: 12,
      date: '2023-05-01T12:00:00Z',
      thumbnail:
        'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww',
    },
    {
      id: 2,
      name: 'Skyline Mobile App',
      images: 8,
      date: '2023-04-15T09:30:00Z',
      thumbnail:
        'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg',
    },
    {
      id: 3,
      name: 'Evergreen Dashboard',
      images: 15,
      date: '2023-03-20T15:45:00Z',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_y4NQVpkCxxD35Q2quUnC6pbubYsds5qwQ&s',
    },
    {
      id: 4,
      name: 'Horizon Branding',
      images: 9,
      date: '2023-02-28T11:00:00Z',
      thumbnail:
        'https://media.istockphoto.com/id/183821822/photo/say.jpg?s=612x612&w=0&k=20&c=kRmCjTzA9cq4amgRgeHkZsZuvxezUtC8wdDYfKg-mho=',
    },
    {
      id: 5,
      name: 'Solaris Website Redesign',
      images: 18,
      date: '2023-01-10T14:20:00Z',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2QuyLEvkDgsnqW6dkQhmWqKVOhIdfXgMaGy4V_GgWggQrMvgNZ7hUYBMnOlDCsg9F02s&usqp=CAU',
    },
  ]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const changeFilteredProjects = (filteredProjects: Project[]) =>
    setFilteredProjects(filteredProjects);

  return (
    <div className="w-full h-full text-white bg-custom-primary">
      <ProjectsSearch
        projects={projects}
        changeFilteredProjects={changeFilteredProjects}
      />
      <main className="px-8 py-5 mx-auto md:px-20">
        <motion.div
          {...fadeAnimation}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
