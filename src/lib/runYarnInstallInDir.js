'use strict'

const Promise = require('bluebird')

const findConfig = require('find-config')
const spawn = require('./spawn')

module.exports = function runYarnCommandInDir (dirPath, opts) {
  const pkgPath = findConfig('package.json', {cwd: dirPath})

  if (!pkgPath) return Promise.resolve() // not a package

  const pkg = findConfig.require('package.json', {cwd: dirPath})

  return spawn(pkg.name, 'yarn', ['install'], {
    cwd: dirPath,
    quiet: opts.quiet
  })
}
