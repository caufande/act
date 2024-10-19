import { createContext } from 'react';

export interface Data {}

export const DataContent = createContext<Data | null>(null);
