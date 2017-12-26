'use strict'

import * as path from 'path'
import * as vscode from 'vscode'
import { browsers }  from './config'
import { exec } from 'child_process'

function isFocused () {
  return !!vscode.window.activeTextEditor
}

export default {
  isFocused
}
