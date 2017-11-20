'use strict'

const Promise = require('bluebird')
const chalk = require('chalk')
const nodeSpawn = require('child_process').spawn

module.exports = function spawn (scope, script, args, opts) {
  return new Promise((resolve, reject) => {
    const p = nodeSpawn(script, args, {cwd: opts.cwd})

    p.stdout.on('data', data => {
      if (!opts.quiet) {
        process.stdout.write(`${chalk.blue(scope)} ${data.toString()}`)
      }
    })

    p.stderr.on('data', data => {
      if (!opts.quiet) {
        process.stderr.write(`${chalk.blue(scope)} ${data.toString()}`)
      }
    })

    p.on('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        const err = new Error(`Script failure`)
        err.code = code
        err.scope = scope
        reject(err)
      }
    })
  })
}
