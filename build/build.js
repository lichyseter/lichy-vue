require('./check-versions')();
let server = require('pushstate-server');
let open = require('open')
let ora = require('ora')
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack');
let config = require('../config');
let webpackConfig = require('./webpack.prod.conf');

console.log(process.env.NODE_ENV)
console.log(process.env.npm_config_preview)

let spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')

        console.log(chalk.cyan('  Build complete.\n'))
        if(process.env.npm_config_preview){
            server.start({
                port: 80,
                directory: './dist',
                file: '/index.html'
            });
            open('http://site/')
        }
    })
})
