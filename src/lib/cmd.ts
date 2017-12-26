'use strict'

import * as vscode from 'vscode'
import {
  isFocused,
  filePath,
  isHtml,
  getDefaultBrowser,
  openFile
} from './util'

function open () {
  console.log('work')
  return
  if (!isFocused()) return

  let path = filePath()

  if (!isHtml()) {
    vscode.window.showInformationMessage('Sorry, only support HTML File')
    return
  }

  let browser = getDefaultBrowser()
  let platform = process.platform
  openFile(platform, path, browser)
}

export {
  open
}
