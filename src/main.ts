import {Editor, MarkdownView, Notice, Plugin} from 'obsidian';

export default class LLMSeparatorRemoverPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'remove-llm-separators',
			name: 'Remove separators from current note',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.removeSeparators(editor);
			}
		});
	}

	onunload() {
	}

	removeSeparators(editor: Editor) {
		const content = editor.getValue();

		// Count how many separators we'll remove
		const matches = content.match(/\n---\n/g);
		const count = matches ? matches.length : 0;

		if (count === 0) {
			new Notice('No separators found');
			return;
		}

		// Remove all instances of the pattern
		const newContent = content.replace(/\n---\n/g, '\n');
		editor.setValue(newContent);

		// Show feedback
		const plural = count === 1 ? '' : 's';
		new Notice(`Removed ${count} separator${plural}`);
	}
}
