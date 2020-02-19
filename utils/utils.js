
var sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const chalk = require("chalk")

const thumbsCreate = async (file, orig, dest) => {

  const fileOrig = await path.resolve(process.cwd(),orig,file);

  const filemarca = await path.resolve(process.cwd(),'logo','padrao.png');
  console.log(chalk.yellowBright(filemarca))

  const file400 = await path.resolve(process.cwd(),'dest',file)
  // const file200 = `./upload/${albumId}/${dest}/${nome}_200.jpg`

  console.log(`Arquivo original => ${fileOrig} \n marca => ${filemarca} \n thumb 400 => ${file400}` )
  // console.log(filemarca)
  // console.log(file400)

  return sharp(fileOrig).rotate()
  // .overlay(filemarca,{gravity: 'center', tile: true})
  .resize(800)
  .composite([{ input: filemarca, gravity: 'southeast' }])
  .toFile(file400)
  .then(info => info)
  .catch(err => console.log(chalk.red(err)))
  // .toFile(file400, function (err, info) {
  //   if (err) console.log(err)
  //   return info
  // })
  // .on('info', function(info) {
  //   console.log('Image height is ' + info.height);
  // });
}


const listFile = async (dest) => {
  console.log(dest)
  const pegar = new RegExp(/.jpg/, "i");
  let photos = []
  console.log('Lista de arquivos na pasta')
  const pastaOrigem = await path.resolve(process.cwd(), dest)
  console.log(pastaOrigem)
  return new Promise((resolve, reject) => {

    fs.readdir(pastaOrigem , (err, files) => {
      if (err) {
        reject([])
      }
      if (files) {
        files.forEach(file => {
          if (pegar.test(file)) {
            photos.push(file)
          }
        })
      }
      console.log(chalk.red(photos))
      resolve(photos)
    })
  })
}


module.exports = {
  thumbsCreate,
  listFile
}