import React, { useMemo } from 'react';
import { CurrentProject, Identity, Project } from '@app/types';
import { History } from 'history';

interface IProps {
  currentProject: CurrentProject;
  identity: Identity;
  history: History;
  children?: React.ReactNode;
}

interface ProjectContextProps {
  project: Project;
  history?: History;
  identity?: Identity;
}

const ProjectContext = React.createContext<ProjectContextProps>({
  project: {
    vid: '',
    version: 0,
  },
});

const ProjectProvider: React.FC<IProps> = ({
  currentProject,
  identity,
  children,
  history,
}) => {
  const providerValue = useMemo(() => {
    return {
      project: currentProject.get(),
      identity,
      history,
    };
  }, [currentProject, identity, history]);

  return (
    <ProjectContext.Provider value={providerValue}>
      {children}
    </ProjectContext.Provider>
  );
};

const useApp = (): ProjectContextProps => {
  const app = React.useContext(ProjectContext);

  if (app === null) {
    throw new Error('useApp called outside from AppProvider');
  }

  return app;
};

export { ProjectProvider, ProjectContext, useApp };