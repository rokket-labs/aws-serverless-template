const { minify } = require('html-minifier')
const { htmlToText } = require('html-to-text')
const { readFileSync } = require('fs')
const { JSDOM } = require('jsdom')
const juice = require('juice')
const glob = require('glob')
const path = require('path')

/**
 * @param {object} serverless Serverless instance.
 * @param {object} options runtime options.
 *
 * @returns {Promise<object[]>} A promise to the templates object array.
 *
 * @see https://github.com/haftahave/serverless-ses-template
 */
module.exports = async (serverless, options) => {
  const files = glob.sync('email/templates/ses/**/*.hbs')

  return files.map(file => {
    const html = readFileSync(file)
    const dom = new JSDOM(html)
    const template = minify(html.toString(), {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
    })

    return {
      subject: dom.window.document.title,
      name: path.basename(file, '.hbs'),
      text: htmlToText(template),
      html: juice(template),
    }
  })
}
