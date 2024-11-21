import { throwError } from '../errors';
import { postHtmlToJson } from '../util';
import Groups from './Groups';
export default async function getGroups(postHtml) {
    const json = await postHtmlToJson(postHtml);
    const sheet = json.content.at(-1)?.content?.at(0)?.content?.at(0);
    if (typeof sheet !== 'string')
        throwError('GroupsPostFormatError', { content: postHtml });
    return new Groups(sheet);
}
