/**
 * @file   mofron-comp-formdlg/index.js
 * @author simpart
 */
let mf = require('mofron');
let Text = require('mofron-comp-text');
let Dialog = require('mofron-comp-dialog');
let efCenter = require('mofron-effect-center');

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
            this.height(null);
            this.getFrame().child()[1].style({
                'z-index' : '100'
            });
            
            /* set form area */
            let fm = new mf.Component({
                width : '100%'
            });
            this.addChild(fm);
            this.target(fm.target());
            
            this.form(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    form (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (0 === this.child().length) ? null : this.child()[0];
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Form')) {
                throw new Error('invalid parameter');
            }
            prm.submitComp().parent().style({
                'z-index' : '90'
            });
            prm.submitComp().visible(false);
            prm.child()[prm.child().length-1].style({
                'padding-bottom' : '40px'
            });
            this.addChild(prm);
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
                            if (null !== dlg.form()) {
                                let snd_ret = dlg.form().send();
                                if (null !== snd_ret) {
                                    dlg.form().message(snd_ret['cause']);
                                }
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
