class GreenFooterComponent {
    radioItemsText = () => cy.get('[for*="footer_name"]');
    radioItemsIcon = () => cy.get('.radioItems').last();

    slider_dot = () => cy.get('.vue-slider-dot');
    slider_maximumPosition = () => cy.get('.vue-slider-mark[style*="left: 100%"]');
    slider_minimumPosition = () => cy.get('.vue-slider-mark[style*="left: 0%"]');

    colorsList = () => cy.get('.ws-color-picker-container');

    add_button = () => cy.get('.app__bottom .btn__confirm');

    preview_area = () => cy.get('.preview-pane-wrap.with-branding');

    selectRadioItemText(text) {
        this.radioItemsText().find(`[value='${text}']`).parent().click();
    }

    selectRadioItemIcon(name) {
        this.radioItemsIcon().find(`[value*='${name}']`).parent().click();
    }

    chooseFontSize(size) {
        this.slider_dot().trigger('mousedown', {whitc: 1});
        if (size === 'maximum') {
            this.slider_maximumPosition().trigger('mousemove').trigger('mouseup', {force:true});
        }
        if (size === 'minimum') {
            this.slider_minimumPosition().trigger('mousemove').trigger('mouseup', {force:true});
        }
        // this.slider_process().

    }

    chooseColor(colorHex) {
        this.colorsList().find(`[ke='${colorHex}']`).click();
    }

    createGreenFooterAddon(text, icon, fontSize, fontColorHex) {
        this.selectRadioItemText(text);
        this.selectRadioItemIcon(icon);
        this.chooseFontSize(fontSize);
        this.chooseColor(fontColorHex);
        this.add_button().click();
        this.preview_area().contains(text);


    }
}
export default GreenFooterComponent