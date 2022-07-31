import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { History } from 'history';

type ProjectVID = string;

export interface Project {
  vid: ProjectVID;
  version: number;
}

export interface CurrentProject {
  get(): Project;
}

export interface Identity {
  getToken(): Promise<string>;
}

export interface AppToolkit {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
  currentProject: CurrentProject;
  history: History;
}