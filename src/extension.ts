'use strict';

import * as vscode from 'vscode'
import {
  openDefault,
  openFromMenu,
  openSpecify
} from './lib/command'

export function activate (context) {

    let openCommand = vscode.commands.registerCommand('extension.viewInBrowser', () => {
      openDefault()
      vscode.window.showInformationMessage('Hello World!')
    })

    let openCommandFromMenu = vscode.commands.registerCommand('extension.viewInBrowserFromMenu', fileUrl => {
      openFromMenu(fileUrl.fsPath)
    })

    let openCommandFromSpecify = vscode.commands.registerCommand('extension.viewInSpecifyBrowser', fileUrl => {
      openSpecify(fileUrl.fsPath)
    })

    context.subscriptions.push(openCommand)
    context.subscriptions.push(openCommandFromMenu)
    context.subscriptions.push(openCommandFromSpecify)
}

// this method is called when your extension is deactivated
export function deactivate() {
}
