import BaseCommand from './BaseCommand';

export default class CopyFilenameCommand extends BaseCommand {
  constructor(context: any) {
    super('granifyUtils.copyFilename', context);
  }

  async execute(uri: any) {
    try {
      const name = this.getName(uri);

      this.vscode.env.clipboard.writeText(name);
      this.vscode.window.setStatusBarMessage(`Copied '${name}' to the clipboard.`);
    } catch (err) {
      this.error(err);
    }
  }
}