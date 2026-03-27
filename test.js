// const figlet = require('figlet');
// const chalk = require('chalk');
const download = require('download-git-repo');

// figlet('HAPPY CLI!', {
//     font: '3D-ASCII'
// },(err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(chalk.green.bold(data));
// });


function downloadFromGit(targetDir) {
    download('github:Hermes-Axe/utils', targetDir, function (err) {
        console.log(err ? 'Error' : 'Success')
    })
}


downloadFromGit('temp')
