/**
 * @file   mofron-comp-formdlg/index.js
 * @author simpart
 */
let mf = require('mofron');
let Text = require('mofron-comp-text');
let Dialog = require('mofron-comp-dialog');
let Form = require('mofron-comp-form');

/**
 * @class mofron.comp.FormDlg
 * @brief form dialog component for mofron
 */
mf.comp.FormDlg = class extends Dialog {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('FormDlg');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.autoClose(false);
            
            let form = new Form({});
            form.submitComp().visible(false);
            
            this.addChild(form);
            this.target(form.target());
            //
            //this.height(null);
            //this.getFrame().child()[1].style({
            //    'z-index' : '100'
            //});
            //
            ///* set form area */
            //let fm = new mf.Component({
            //    width : '100%'
            //});
            //this.addChild(fm);
            //this.target(fm.target());
            //
            //this.form(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    formOpt (opt) {
        try {
            this.getForm().execOption(opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getForm () {
        try {
            return this.target().component();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addButton (prm) {
        try {
            if (null === this.button()) {
                super.addButton(prm);
                this.button()[0].clickEvent(
                    (btn, dlg) => {
                        try {
                            let chk = dlg.getForm().send();
                            let msg = (null !== dlg.getForm().message()) ? true : false;
                            if (null !== chk) {
                                dlg.getForm().message(chk.cause);
                                if (true === msg) {
                                    let msg_hei = dlg.getForm().message().height();
                                    let mgn_top = dlg.getForm().getConfig('layout', 'Margin').value();
                                    dlg.height(
                                        dlg.height() + msg_hei + mgn_top
                                    );
                                }
                            } else {
                                dlg.getForm().message(null);
                                if (true === msg) {
                                    dlg.height(dlg.height() - dlg.getForm().message().height());
                                }
                                dlg.visible(false);
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    this
                );
            } else {
                super.addButton(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e
        }
    }
}
module.exports = mofron.comp.FormDlg;
/* end of file */
