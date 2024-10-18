import { HTMLToJSON } from 'html-to-json-parser';
import { removeBlankBetweenAttr } from '../util';
import { Act } from './Act';
export default async function parseComment(comment) {
    const html = removeBlankBetweenAttr(`<div>${comment.body}</div>`);
    const json = await HTMLToJSON(html);
    const act = new Act(comment, json);
    return act;
}
