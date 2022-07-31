import React, { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import MainPage from '@app/pages/Main';
import { Providers } from '@app/components/Providers/Providers';
import { AppToolkit } from '@app/types';
import { useMount } from '@app/hooks/useMount';

// const getInitProps = async ({
//   currentProject,
//   graphqlClient,
//   identity,
//   history,
// }: Partial<AppToolkit>): Promise<Required<AppToolkit>> =>
//   new Promise<AppToolkit>((resolve) => {
//     if (currentProject && graphqlClient && identity && history)
//       resolve({ currentProject, identity, graphqlClient, history });
//   });

const App: React.FC<Partial<AppToolkit>> = (props) => {
  const { graphqlClient, identity, currentProject, history } = props;
  const [isLoading, setIsLoading] = useState(true);

  useMount(() => {
    const init = async () => {
      try {
        // const initProps = await getInitProps(props);

        // projectService.init({
        //   client: initProps.graphqlClient,
        //   project: initProps.currentProject,
        //   identity: initProps.identity,
        // });

        // treeService.init({
        //   client: initProps.graphqlClient,
        //   project: initProps.currentProject,
        //   identity: initProps.identity,
        // });

        // fileService.init({
        //   client: initProps.graphqlClient,
        //   project: initProps.currentProject,
        //   identity: initProps.identity,
        // });
      } catch (e) {
        throw Error('Service has been thrown error at initialized step');
      }
    };

    init().finally(() => setIsLoading(false));
  });

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Theme preset={presetGpnDefault}>
          <Providers
            graphqlClient={graphqlClient}
            identity={identity}
            currentProject={currentProject}
            history={history}
          >
            {!isLoading && <MainPage />}
          </Providers>
        </Theme>
      </ErrorBoundary>
    </React.StrictMode>

  );
}

export default App;
