'use babel';

import CaraMenangSlotView from './cara-menang-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  caraMenangSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.caraMenangSlotView = new CaraMenangSlotView(state.caraMenangSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.caraMenangSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cara-menang-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.caraMenangSlotView.destroy();
  },

  serialize() {
    return {
      caraMenangSlotViewState: this.caraMenangSlotView.serialize()
    };
  },

  toggle() {
    console.log('CaraMenangSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
