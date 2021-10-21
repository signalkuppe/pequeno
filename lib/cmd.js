#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const Pequeno = require('./pequeno');
const defaultConfig = require('./config');

async function cmd() {
    let userConfig = {};
    const configFile = '.pequeno.js';
    try {
        const argv = require('minimist')(process.argv.slice(2), {
            boolean: [
                'verbose',
                'build',
                'serve',
                'clean',
                'example',
                'noAfterBuild',
            ],
            string: ['page', 'path'],
            default: {
                verbose: false,
            },
            unknown: function (unknownArgument) {
                console.log(`Unknown command ${unknownArgument}, exiting`);
                process.exit();
            },
        });
        let userConfigPath = path.join(process.cwd(), configFile);
        if (argv.example) {
            userConfigPath = path.join(__dirname, '../example', configFile);
        }
        if (fs.pathExistsSync(userConfigPath)) {
            userConfig = require(userConfigPath);
        }

        const config = { ...defaultConfig, ...userConfig };
        const pequeno = new Pequeno(argv, config);
        global.pequeno = pequeno;
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
