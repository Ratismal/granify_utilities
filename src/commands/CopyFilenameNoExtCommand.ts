import BaseCommand from './BaseCommand';

export default class CopyFilenameNoExtCommand extends BaseCommand {
  constructor(context: any) {
    super('granifyUtils.copyFilenameNoExt', context);
  }

  async execute(uri: any) {
    try {
      const name = this.getName(uri);
      const parts = name.split('.');
      const noExt = parts[0];

      this.vscode.env.clipboard.writeText(name);
      this.vscode.window.setStatusBarMessage(`Copied '${name}' to the clipboard.`);
    } catch (err) {
      this.error(err);
    }
  }
}