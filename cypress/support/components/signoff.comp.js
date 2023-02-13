class SignOffComponent {
    signature_button = () => cy.get('#styles .style-option').first();
    signoff_button = () => cy.get('#styles .style-option').eq(1);

    signoff_dropdown = () => cy.get('.optionItems .ws-dropdown').first();
    font_dropdown = () => cy.get('.optionItems .ws-dropdown').last();
    dropdown_values = () => cy.get('ul>li.dropdown-menu-item');

    signAs_input = () => cy.get('#app_signoff__name_input');

    slider_dot = () => cy.get('.vue-slider-dot');
    slider_maximumPosition = () => cy.get('.vue-slider-mark[style*="left: 100%"]');
    slider_minimumPosition = () => cy.get('.vue-slider-mark[style*="left: 0%"]');
    
    add_button = () => cy.get('.app__bottom .btn__confirm');

    preview_area = () => cy.get('.preview-pane-wrap.with-branding');
    preview_area_signOff = () => cy.get('.preview__body');
    signAs_previewArea = (text) => cy.get(`.preview__body [alt="${text}"]`)

    chooseStyle(style) {
        if (style === 'signature') {this.signature_button().click()}
        if (style === 'signoff') {this.signoff_button().click()}
    }

    chooseSignoff(signoff) {
        this.signoff_dropdown().click();
        this.dropdown_values().contains(signoff).click();
    }

    changeSignAsText(text) {
        if(text === 'none') {
            return;
        }
        this.signAs_input().clear();
        this.signAs_input().type(text);
        this.preview_area_signOff().find(`[alt='${text}']`, {timeout: 10000});
    }

    chooseFontType(fontType) {
        if (fontType === 'default') {
            return
        }
        this.font_dropdown().click();
        this.dropdown_values().contains(fontType).click();
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
    
    createSignOffAddon(style, signoff, signAsText, fontType, fontSize) {
        this.chooseStyle(style);
        this.chooseSignoff(signoff);
        this.changeSignAsText(signAsText);
        this.chooseFontType(fontType);
        this.chooseFontSize(fontSize);
        this.add_button().click();
        this.preview_area().should('be.visible');
    }
}

export default SignOffComponent