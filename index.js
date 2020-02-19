#!/usr/bin/env node
const yargs = require('yargs')
const util = require('./utils/utils')
const chalk = require("chalk")

yargs.version('0.0.1');

yargs.command({
  command: 'resize',
  describe: 'Muda tamanho das fotos',
  builder: {
    pasta: {
      describe: 'onde esta os arquivos',
      demandOption: true,
      type: 'string',
    }
  },
  handler: function (yargs) {
    console.log(yargs.pasta);
    const arquivos = util.listFile(yargs.pasta).then((arquivos) => {
      arquivos.map( async (item) => {
        await util.thumbsCreate(item, yargs.pasta, 'dest').then((info) => console.log(info))
      })
      console.log(chalk.green(arquivos))
    })
    console.log(chalk.green(arquivos))
  }
})

yargs.parse();
