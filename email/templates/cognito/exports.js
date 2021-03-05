const { minify } = require('html-minifier')
const { readFileSync } = require('fs')
const { JSDOM } = require('jsdom')
const juice = require('juice')
const glob = require('glob')
const path = require('path')

/**
 * @returns {object} An object with the template names and HTML data.
 */
module.exports = async ({ options, resolveConfigurationProperty }) => {
  const files = glob.sync('email/templates/cognito/**/*.html')
  const templates = {}

  for (const file of files) {
    const html = readFileSync(file)
    const dom = new JSDOM(html)
    const template = minify(html.toString(), {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
    })

    templates[path.basename(file, '.html')] = {
      subject: dom.window.document.title,
      message: juice(template),
    }
  }

  return templates
}
