import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { fadeAnimation } from '@/lib/animations';
import { Project } from './projects.types';
import ProjectsSearch from './ProjectsSearch';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api/axiosConfig';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await api.get(`/projects`);
        const { projects } = res.data;
        setProjects(projects);
      } catch (error: any) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message,
          variant: 'destructive',
        });
      }
    };

    fetchAllProjects();
  }, [toast]);

  const changeFilteredProjects = (filteredProjects: Project[]) => setFilteredProjects(filteredProjects);

  return (
    <div className="w-full h-full text-white bg-custom-primary">
      <ProjectsSearch projects={projects} changeFilteredProjects={changeFilteredProjects} />
      <main className="px-8 py-5 mx-auto md:px-20">
        <motion.div {...fadeAnimation} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
