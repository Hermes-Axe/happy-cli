#!/usr/bin/env node

require('dotenv').config();

const figlet = require('figlet');
const chalk = require('chalk');
const prompts = require('prompts');
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const cwd = process.cwd();
const download = require('download-git-repo');

const downloadPlatform = process.env.DOWNLOAD_PLATFORM
const downloadUrl = process.env.DOWNLOAD_URL

const { frameworkVersions, dependencies } = require('../config/dep');

const resolve = (...paths) => path.resolve(cwd, ...paths)

function getDependencies(framework, version) {
    framework = String(framework);
    version = String(version);
    const dep = dependencies[framework] || [];
    return dep.filter(item => item.peerVersion.includes(version)).map(item => ({
        title: item.title,
        value: item.value,
        selected: typeof item.selected === 'function' ? item.selected(version) : item.selected
    }));
}

/**
 * Download from git
 * @param {String} targetDir 
 * @returns {Promise<boolean>}
 */
function downloadFromGit(targetDir) {
    const realDownloadUrl = `${downloadPlatform}:${downloadUrl}`
    return new Promise((resolve, reject) => {
        download(realDownloadUrl, targetDir, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        })
    })
}

function getFramework() {
    return frameworkVersions.map(item => ({
        title: item.title,
        value: item.value,
        disabled: item.disabled,
        description: item.description
    }));
}
function getFrameworkVersions(framework) {
    const versions = frameworkVersions.find(item => item.value === framework).versions || [];
    return versions.map(version => ({
        title: version,
        value: version
    }));
}

/**
 * Check if the project name is valid
 * valid: abc, abc123, abc-123, abc-def
 * @param {String} name 
 * @returns {boolean}
 */
function isValid(name) {
    return !!name && /^[a-zA-Z]+-?[a-zA-Z0-9]+$/.test(name);
}

function isExists(name) {
    return fs.existsSync(resolve(name));
}


function showFiglet(msg) {
    return new Promise(resolve => {
        figlet(msg, {
            font: '3D-ASCII'
        },(err, data) => {
          if (err) {
            return;
          }
          resolve(chalk.green.bold(data));
        });
    })
}

;(async () => {
    const logData = await showFiglet('HAPPY Cli!');
    console.log('\n\n');
    console.log(logData);
    const answers = await prompts([
        {
            type: 'text',
            name: 'projectName',
            message: 'What is the project name?',
            validate: isValid
        },
        // check projectname is valid
        {
            type: projectName => isExists(projectName) ? 'confirm' : null,
            name: 'isOverwrite',
            message: 'Project name already exists, overwrite it?',
            initial: false
        },
        {
            type: isOverwrite => {
                if (!isOverwrite) {
                    console.log('Don\'t overwrite the project, exit!');
                    process.exit(1);
                } else {
                    return null
                }
            }
        },
        {
            type: 'select',
            name: 'framework',
            message: 'Select your framework?',
            choices: getFramework,
            initial: 0
        },
        {
            type: 'select',
            name: 'version',
            message: framework => `Select the ${framework} version?`,
            choices: framework => getFrameworkVersions(framework),
            initial: 0
        },
        {
            type: 'multiselect',
            name: 'dependencies',
            message: 'Select your dependencies?',
            choices: (version, { framework }) => getDependencies(framework, version),
        }
    ])
    console.log(answers);
    const spinner = ora('Downloading...').start();
    downloadFromGit(resolve(answers.projectName)).then(() => {
        spinner.succeed('Success');
    }).catch(err => {
        spinner.fail(err.message);
    })
})()
