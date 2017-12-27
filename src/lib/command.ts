'use strict'

import * as vscode from 'vscode'
import browsers from './browser'
import {
  isFocused,
  getFilePath,
  isHtml,
  getDefaultBrowser,
  openFileInBrowser
} from './util'

const platform = process.platform
const defaultBrowser = getDefaultBrowser()

/**
 * Open Default Browser
 */
function openDefault () {
  if (!isFocused()) return

  let path = getFilePath()

  if (!isHtml()) {
    return vscode.window.showInformationMessage('Sorry, only support HTML File')
  }

  openFileInBrowser(platform, path, defaultBrowser)
}

function openFromMenu (file) {
  openFileInBrowser(platform, getFilePath(file), defaultBrowser)
}

function openSpecify (file) {
  if (file) {
    file = getFilePath(file)
  } else {
    file = getFilePath()
  }

  vscode.window.showQuickPick(browsers)
    .then((item: any) => {
      if (!item) return
      openFileInBrowser(platform, file, item.standardName)
    })
}

export {
  openDefault,
  openFromMenu,
  openSpecify
}
