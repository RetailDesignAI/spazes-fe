import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { fadeAnimation } from '@/lib/animations';
import { Project } from './projects.types';
import ProjectsSearch from './ProjectsSearch';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api/axiosConfig';

const PROJECT_PAGE_LIMIT = 20;

export default function Projects() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [pagination, setPagination] = useState({
    page: 1,
    totalDocs: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await api.get(`/projects?limit=${PROJECT_PAGE_LIMIT}&page=${pagination.page}`);
        const { docs, totalDocs, page, totalPages } = res.data;
        setProjects(docs);
        setPagination({ totalDocs, page, totalPages });
      } catch (error: any) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message,
          variant: 'destructive',
        });
      }
    };

    fetchAllProjects();
  }, [toast, pagination.page]);

  const changeFilteredProjects = (filteredProjects: Project[]) => setFilteredProjects(filteredProjects);

  return (
    <div className="w-full h-full text-white bg-custom-primary overflow-auto">
      <ProjectsSearch projects={projects} changeFilteredProjects={changeFilteredProjects} />
      <main className="px-8 py-5 mx-auto md:px-20">
        <motion.div {...fadeAnimation} className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>
      </main>
      <div className="w-full h-20">
        <div className="flex justify-center">
          <div className="flex items-center justify-center mt-4">
            <button
              className="p-2 text-sm font-bold text-white bg-custom-primary rounded-l"
              onClick={() => setPagination({ ...pagination, page: 1 })}
              disabled={pagination.page === 1}
            >
              First
            </button>
            <button
              className="p-2 text-sm font-bold text-white bg-custom-primary"
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            <button
              className="p-2 text-sm font-bold text-white bg-custom-primary"
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </button>
            <button
              className="p-2 text-sm font-bold text-white bg-custom-primary rounded-r"
              onClick={() => setPagination({ ...pagination, page: pagination.totalPages })}
              disabled={pagination.page === pagination.totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
