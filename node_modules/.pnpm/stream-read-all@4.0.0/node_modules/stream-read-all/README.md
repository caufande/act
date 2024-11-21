[![view on npm](https://badgen.net/npm/v/stream-read-all)](https://www.npmjs.org/package/stream-read-all)
[![npm module downloads](https://badgen.net/npm/dt/stream-read-all)](https://www.npmjs.org/package/stream-read-all)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/stream-read-all)](https://github.com/75lb/stream-read-all/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/stream-read-all)](https://github.com/75lb/stream-read-all/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/stream-read-all/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/stream-read-all/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# stream-read-all

Returns a promise which fulfils with the supplied stream's content. Supports both regular and [object mode](https://nodejs.org/dist/latest-v19.x/docs/api/stream.html#object-mode) streams.

This example script...

```js
import streamReadAll from 'stream-read-all'
const stdin = await streamReadAll(process.stdin)
console.log(stdin.toString())
```

...prints this output.

```
$ echo Hello | node example.js
Hello
```

* * *

&copy; 2017-23 Lloyd Brookes <75pound@gmail.com>.
