'use strict'

import * as path from 'path'
import * as vscode from 'vscode'
import { browsers }  from './config'
import { exec } from 'child_process'

function isFocused () {
  return !!vscode.window.activeTextEditor
}

function isHtml () {
  return vscode.window.activeTextEditor.document.languageId === 'html'
}

function filePath (file) {
  if (!file) {
    let uri = vscode.window.activeTextEditor.document.uri
    return `file://${uri.fsPath}`
  }
  return `file://${file}`
}

function getStandardBrowserName (name) {
  name = name && name.toLowerCase()

  for (let i = 0, len = browsers.length; i < len; i++) {
    if (browsers[i].name === name) {
      return browsers[i].standardName
    }
  }
  return ''
}

function getDefaultBrowser () {
  let browser = ''
  let config = vscode.workspace.getConfiguration('view-in-browser')

  if (config.default) {
    browser = config.default
  }

  return browser
}

function openFile (platform, path, browser) {
  let cmd
  let browserName = getStandardBrowserName(browser)

  switch (platform) {
    case 'win32':
      cmd = browserName ? `start ${browserName} "${path}"` : `start "" "${path}"`
      break
    case 'darwin':
      cmd = browserName ? `open "${path}" -a "${browserName}"` : `open "${path}"`
      break
    default:
      cmd = browserName ? `${browserName} "${path}"` : `xdg-open "${path}"`
      break
  }

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      vscode.window.showErrorMessage('Error occured!')
    }
  })
}

export default {
  isFocused,
  isHtml,
  filePath,
  openFile,
  getDefaultBrowser
}
