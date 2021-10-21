const ora = require('ora');

const afterBuild = async function (renderedPages) {
    const spinner = ora();
    spinner.start(`Running afterBuild function`);
    try {
        await pequeno.config.afterBuild(renderedPages);
        spinner.succeed();
        spinner.stop();
    } catch (err) {
        spinner.fail(
            `An error occured while processing the afterBuild function`,
        );
        pequeno.log.error(err);
    }
};

module.exports = afterBuild;
