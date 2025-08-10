const { engines } = require('../package.json');
const semver = require('semver');

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
    console.error(
        '\x1b[31m%s\x1b[0m', 
        `Required node version ${version} not satisfied with current version ${process.version}.`
    );
    process.exit(1);
}

console.log('\x1b[32m%s\x1b[0m', `Node version ${process.version} satisfies required version ${version}`);