/**
 * 数据上下文
 * @license AGPL-3.0-or-later
 */
declare module './data-content';

import { Pulled } from '@cauact/db';
import { createContext } from 'react';

export interface Data extends Pulled {}

export const DataContent = createContext<Data | null>(null);
