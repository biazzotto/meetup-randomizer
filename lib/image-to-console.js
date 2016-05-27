'use strict'

const ansi = require('ansi')
const Jimp = require('jimp')

module.exports = function imageToConsole (photoPath, cols, callback) {
  Jimp.read(photoPath, (error, image) => {
    if (error) return callback(error)

    const cursor = ansi(process.stdout)
    const resizedImage = image.resize(cols, Jimp.AUTO)
    const height = resizedImage.bitmap.height
    const width = resizedImage.bitmap.width

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = `#${resizedImage.getPixelColor(x, y).toString(16).substr(0, 6)}`

        cursor.hex(color).write('██').fg.reset()
      }

      cursor.write('\n')
    }

    callback(null, true)
  })
}