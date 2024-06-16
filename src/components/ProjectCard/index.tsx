import { Link } from 'react-router-dom';
import { Image } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Project } from '@/pages/Projects/projects.types';

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <Card className="transition-colors border-none shadow hover:bg-[#282d33b4] duration-300 bg-custom-secondary shadow-neutral-600">
      <Link to={`/projects/${project._id}`} className="block">
        <img
          src={project.images[0].url}
          alt={project.name}
          width={400}
          height={300}
          className="object-cover w-full h-48 rounded-t-lg"
        />
        <CardContent className="p-4">
          <p className="text-lg font-semibold text-white line-clamp-1">{project.name}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-custom-gray">{new Date(project.createdAt).toLocaleDateString()}</div>
            <div className="flex items-center text-xs text-custom-gray">
              <Image className="w-4 h-4 mr-1" /> {project.images.length}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProjectCard;
