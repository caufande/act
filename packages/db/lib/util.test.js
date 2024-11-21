import test from 'tape';
import { deepEqual, getHolder, lowerFirst, postHtmlToJson, range, removeBlankBetweenAttr, textToDate } from './util';
import { m } from '@cauact/test-helper';
test('range', t => {
    t.deepEqual(range(3, 5), [3, 4]);
    t.deepEqual(range(2, 9), [2, 3, 4, 5, 6, 7, 8]);
    t.end();
});
test('首字母小写', t => {
    t.equal(lowerFirst('asdb'), 'asdb');
    t.equal(lowerFirst('ASDB'), 'aSDB');
    t.end();
});
test('删除标签间的空白', t => {
    t.equal(removeBlankBetweenAttr(m(' <div>   </div>', '   <br>   ')), ' <div></div><br>   ');
    t.end();
});
test('文字转时间', t => {
    t.deepEqual(textToDate('2024/10/15'), new Date(2024, 9, 15));
    t.end();
});
test('html解析', async (t) => {
    t.deepEqual(await postHtmlToJson('<a id="hh" > 1 23</a  ><br><br   /><s>  </s> '), {
        type: 'div',
        content: [
            { type: 'a', content: [' 1 23'], attributes: { id: 'hh' } },
            { type: 'br' },
            { type: 'br' },
            { type: 's' },
        ],
    });
    t.end();
});
test('深度比较', t => {
    t.ok(deepEqual([[[[[1]]]]], [[[[[1]]]]]), '比较成功');
    t.notok(deepEqual([[[[[false]]]]], [[[[[null]]]]]), '且严格');
    t.end();
});
test('异步阻塞器', async (t) => {
    t.plan(2);
    const { promise, res } = getHolder();
    let f = false;
    promise.then(n => {
        t.ok(f, '前者先执行完');
        t.equal(n, 123, '并获得结果');
    });
    await new Promise(res => setTimeout(res, 200));
    f = true;
    res(123);
});
