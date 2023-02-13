require('@4tw/cypress-drag-drop')

class EditPage {
    searchTextBox = () => cy.get('.Search');
    overlay = () => cy.get('#anon-overlay');
    apps_button = () => cy.get('[tab-name="ws-addons"]');
    styledSignoff_button = () => cy.get('[addon-id="signoff"]');
    greenFooter_button = () => cy.get('[addon-id="green_footer"]');
    addons_lists = () => cy.get('.addons__list>div');
    greenAddon = () => cy.get('.green_footer .addon__details__move');
    secondSignOffAddedAddon = ':nth-child(2) >.signoff .addon__details__move';
    remove_addon = '.addon__remove';
    addon_name = '.addon__details__name';


    moveGreenAddonBetweenSignOff(){
        this.greenAddon().drag(this.secondSignOffAddedAddon);
    }

    removeAddon(index) {
        this.addons_lists().find(this.remove_addon).eq(index).click();
    }
    
    getMainAddonsNames() {
        return this.addons_lists().first().find(this.addon_name);
    }

    getAdditionalAddonsNames() {
        return this.addons_lists().last().find(this.addon_name);
    }
    
    selectStyledSignOffAddon() {
        this.styledSignoff_button().click();
    }

    selectGreenFooterAddon() {
        this.greenFooter_button().click({force:true});
    }

    goToApps = () => {
        this.overlay().click({force:true});
        this.apps_button().click();
    }
    
}

export default EditPage