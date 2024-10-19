import { Pulled } from '@cauact/db';
import { createContext } from 'react';

export interface Data extends Pulled {}

export const DataContent = createContext<Data | null>(null);
