import { Pulled } from '@cauact/db/lib/Puller';
import { createContext } from 'react';

export interface Data extends Pulled {}

export const DataContent = createContext<Data | null>(null);
