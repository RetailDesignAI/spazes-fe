import SearchBar from '@/components/SearchBar';
import { useEffect, useMemo, useState } from 'react';
import { Project } from './projects.types';
import { FILTERS } from './constants';
// import useDebouncedValue from '@/hooks/useDebounceValue';
// import api from '@/api/axiosConfig';

type Props = {
  projects: Project[];
  changeFilteredProjects: (filteredProjects: Project[]) => void;
};

const ProjectsSearch = ({ projects, changeFilteredProjects }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const debouncedSearchTerm = useDebouncedValue(searchTerm, 1000);
  const [sortBy, setSortBy] = useState<string>(FILTERS.Latest);

  const filteredProjects = useMemo(() => {
    return projects
      ?.filter((project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        switch (sortBy) {
          case FILTERS.Latest:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case FILTERS.Oldest:
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case FILTERS.Images:
            return b.imageCount - a.imageCount;
          default:
            return 0;
        }
      });
  }, [projects, searchTerm, sortBy]);

  useEffect(() => {
    changeFilteredProjects(filteredProjects);
  }, [filteredProjects, changeFilteredProjects]);

  const changeSearchTerm = (searchTerm: string) => setSearchTerm(searchTerm);
  const changeSortBy = (sortBy: string) => setSortBy(sortBy);

  return (
    <header className="px-8 py-4 md:px-20">
      <div className="flex items-center justify-between mx-auto">
        <SearchBar
          searchTerm={searchTerm}
          changeSearchTerm={changeSearchTerm}
          sortBy={sortBy}
          changeSortBy={changeSortBy}
          filters={FILTERS}
        />
      </div>
    </header>
  );
};

export default ProjectsSearch;
