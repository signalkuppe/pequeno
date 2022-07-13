const path = require('path');
const { createLogger, format, transports } = require('winston');
const chokidar = require('chokidar');
const browserSync = require('browser-sync').create('pequeno-server');
const NodeCache = require('node-cache');
const build = require('./build');
const clean = require('./clean');
const copy = require('./copy');
const { joinPath } = require('./utils');

function Pequeno(opts, config) {
    let baseDir;
    if (opts.example) {
        baseDir = joinPath(__dirname, '../example');
    } else {
        baseDir = joinPath(process.cwd(), config.srcDir);
    }

    this.log = createLogger({
        level: opts.verbose ? 'verbose' : 'info',
        format: format.combine(
            format.colorize(),
            format.splat(),
            format.simple(),
        ),
        transports: [new transports.Console()],
    });
    this.config = config;
    this.options = opts;
    this.baseDir = baseDir;

    this.build = async () => {
        await build();
    };

    this.clean = async () => {
        await clean();
    };

    this.serve = () => {
        const serveDir = joinPath(process.cwd(), this.config.outputDir);
        const watchDir = this.baseDir;
        const onBsInit = () => {
            chokidar
                .watch(watchDir, {
                    awaitWriteFinish: {
                        stabilityThreshold: 100,
                        pollInterval: 100,
                    },
                })
                .on('ready', () => {
                    this.log.info('Watching %s for changes', watchDir);
                })
                .on('change', async (p) => {
                    const fileName = path.parse(p).name;
                    this.log.info('%s changed', fileName);
                    const isPublicFile =
                        p.indexOf(`${this.config.publicDir}/`) !== -1;
                    if (isPublicFile) {
                        this.log.verbose('Changed a public file');
                        await copy(p);
                    } else {
                        this.log.verbose('Changed a template');
                        await this.build();
                    }
                    browserSync.reload();
                });
        };
        browserSync.init(
            {
                server: serveDir,
                port: 8080,
                open: false,
                notify: false,
                minify: false,
            },
            onBsInit,
        );
    };

    this.cache = new NodeCache({
        checkperiod: 0,
    });

    this.log.verbose('Pequeno initialized, baseDir is %s', this.baseDir);
}

module.exports = Pequeno;
