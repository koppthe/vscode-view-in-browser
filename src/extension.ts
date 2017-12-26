'use strict';

import * as vscode from 'vscode'
import { open } from './lib/cmd'

export function activate (context) {

    console.log('Congratulations, your extension "vscode-view-in-browser" is now active!')

    let disposable = vscode.commands.registerCommand('extension.viewInBrowser', () => {
        vscode.window.showInformationMessage('Hello World!');
    })

    context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {
}
