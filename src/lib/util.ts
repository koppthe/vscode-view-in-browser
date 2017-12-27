'use strict'

import * as path from 'path'
import * as vscode from 'vscode'
import browsers  from './browser'
import { exec } from 'child_process'

function isFocused () : boolean {
  return !!vscode.window.activeTextEditor
}

function isHtml () : boolean {
  return vscode.window.activeTextEditor.document.languageId === 'html'
}

function getFilePath (file: string = '') : string {
  if (!file) {
    let uri = vscode.window.activeTextEditor.document.uri
    return path.resolve(uri.fsPath)
  }
  return path.resolve(file)
}

function getStandardBrowserName (name: string) : string {
  name = name && name.toLowerCase()

  for (let i = 0, len = browsers.length; i < len; i++) {
    if (browsers[i].name === name) {
      return browsers[i].standardName
    }
  }
  return ''
}

function getDefaultBrowser () : string {
  let browser: string = ''
  let config = vscode.workspace.getConfiguration('view-in-browser')

  if (config.default) {
    browser = config.default
  }

  return browser
}

function openFileInBrowser (platform: string, path: string, browser: string) {
  let cmd: string
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

  exec(cmd, err => {
    if (err) {
      vscode.window.showErrorMessage('Sorry, error occured!')
    }
  })
}

export {
  isFocused,
  isHtml,
  getFilePath,
  openFileInBrowser,
  getDefaultBrowser
}
