/**
 * 活动类测试
 * @license AGPL-3.0-or-later
 */
declare module './Act.test';
import { Operation } from './groupExpr';
export declare const demoStage: {
    name: string;
    timeSteps: [Date, Date][];
    details: string[];
    partition: [Operation.Or, [Operation.And, [Operation.Not, [Operation.Not, string]], [Operation.And, string, [Operation.Not, string]]], [Operation.Or, [Operation.And, string, [Operation.Not, string]], string]];
};
export declare const demoDetail: {
    title: string;
    strings: string[];
    details: {
        title: string;
        strings: string[];
        details: {
            title: string;
            strings: string[];
            details: never[];
        }[];
    }[];
};
export declare const demoActParsed: {
    title: string;
    detail: {
        title: string;
        strings: string[];
        details: {
            title: string;
            strings: string[];
            details: {
                title: string;
                strings: string[];
                details: never[];
            }[];
        }[];
    };
    groupExpr: string;
    stages: never[];
};
export declare const demoAct: {
    title: string;
    detail: {
        title: string;
        strings: string[];
        details: {
            title: string;
            strings: string[];
            details: {
                title: string;
                strings: string[];
                details: never[];
            }[];
        }[];
    };
    groupExpr: string;
    stages: never[];
    floor: number;
    id: number;
    author: string;
    authorUrl: string;
};
