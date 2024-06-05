import { useState } from 'react';

const ProjectHeader = () => {
  const [projectName, setProjectName] = useState('Project Name');
  const [showError, setShowError] = useState(false);

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProjectName(name);
    if (name === '') {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <header className="px-8 pt-4 md:px-20">
      <div className="flex items-center mx-auto">
        <div className="relative h-10">
          <input
            className="text-lg bg-transparent border-b-[0.05em] h-full border-transparent px-1 duration-300 hover:border-custom-gray focus:border-custom-gray outline-none"
            onChange={handleProjectNameChange}
            placeholder="Untitled Project"
            value={projectName}
          />
          {showError && (
            <p className="absolute text-xs text-red-500 -bottom-5">
              Enter a valid name!
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
