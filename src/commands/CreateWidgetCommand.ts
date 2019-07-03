import BaseCommand from './BaseCommand';
import * as fs from 'fs-extra';
import * as path from 'path';


export default class CreateWidgetCommand extends BaseCommand {
  constructor(context: any) {
    super('granifyUtils.createWidget', context);
  }

  async execute(uri: any) {
    try {
      let p = uri.fsPath;
      let stat = await fs.stat(p);
      if (stat.isFile()) {
        p = path.join(p, '..');
        stat = await fs.stat(p);
      }
      const files = await fs.readdir(p);
      try {
        for (const file of files) {
          await fs.ensureFile(path.join(p, file));
        }
      } catch (err) {
        this.error(new Error('You cannot create a widget from a directory that contains another directory.'));
        return;
      }
      const oldName = path.basename(p);
      const input = await this.vscode.window.showInputBox({
        prompt: 'What is the name of the new widget?',
        value: oldName
      });

      if (!input) {
        this.statusBar('Widget creation cancelled.');
        return;
      }

      const op = p;
      p = path.join(p, '..', input);
      await fs.mkdir(p);
      const oldClass = oldName.replace(/[\W]/g, '');
      const newClass = input.replace(/[\W]/g, '');
      const regex = new RegExp(oldClass, 'g');
      const newFiles = [];
      for (const file of files) {
        let parts = file.split('.');
        let fname = input;
        if (parts.length > 1) fname += '.' + parts.slice(1).join('.');
        if (file.toLowerCase() === 'configuration.json') fname = file;
        newFiles.push(fname);
        const content = await fs.readFile(path.join(op, file), { encoding: 'utf8' });
        await fs.writeFile(path.join(p, fname), content.replace(regex, newClass));
      }

      const doc = await this.vscode.workspace.openTextDocument(this.vscode.Uri.file(path.join(p, newFiles[0])));
      this.vscode.window.showTextDocument(doc);
      this.statusBar(`Successfully created a new widget '${input}'.`);
    } catch (err) {
      this.error(err);
    }
  }
}