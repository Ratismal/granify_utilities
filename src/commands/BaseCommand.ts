import * as vscode from 'vscode';

export default class BaseCommand {
  public name: string;
  public context: vscode.ExtensionContext;
  public vscode: any;

  constructor(name: string, context: vscode.ExtensionContext) {
    this.name = name;
    this.context = context;
    this.vscode = vscode;
  }

  getName(uri: any) {
    const parts = uri.toString().split('/');
    return parts[parts.length - 1];
  }

  async execute(uri: any) {

  }

  error(err: Error) {
    console.error(err);
    this.vscode.window.showErrorMessage(err.message);
  }

  statusBar(text: string) {
    this.vscode.window.setStatusBarMessage(text);
  }

  register() {
    this.context.subscriptions.push(vscode.commands.registerCommand(this.name, this.execute.bind(this)));
  }
}