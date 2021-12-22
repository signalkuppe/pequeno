#!/usr/bin/env node
const fs = require('fs-extra');
const Pequeno = require('./pequeno');
const defaultConfig = require('./config');
const { joinPath } = require('./utils');

async function cmd() {
    let userConfig = {};
    const configFile = '.pequeno.js';
    try {
        const argv = require('minimist')(process.argv.slice(2), {
            boolean: ['verbose', 'build', 'serve', 'clean', 'example'],
            default: {
                verbose: false,
            },
            unknown: function (unknownArgument) {
                console.log(`Unknown command ${unknownArgument}, exiting`);
                process.exit();
            },
        });
        let userConfigPath = joinPath(process.cwd(), configFile);
        if (argv.example) {
            userConfigPath = joinPath(__dirname, '../example', configFile);
        }
        if (fs.pathExistsSync(userConfigPath)) {
            userConfig = require(userConfigPath);
        }

        const config = { ...defaultConfig, ...userConfig };
        let pequeno = new Pequeno(argv, config);
        if (argv.clean) {
            await pequeno.clean();
        }
        await pequeno.build();

        if (argv.serve) {
            pequeno.serve();
        }
    } catch (err) {
        console.log('Cannot start pequeno', err);
        process.exit();
    }
}

cmd();
