/// <reference types="cypress" />
import HomePage from '../support/pageObjects/home.page';
import EditPage from '../support/pageObjects/edit.page'
import SignOffComponent from '../support/components/signoff.comp';
import GreenFooretComponent from '../support/components/greenFooter.comp'

describe('Checking the display and modification of addons', () => {
    Cypress.config('defaultCommandTimeout', 15000);
    const homePage = new HomePage();
    const editPage = new EditPage();
    const signOffComp = new SignOffComponent();
    const greenFooterComp = new GreenFooretComponent();
    
    before(() => {
        cy.fixture('test_data').then(function(data) {
            globalThis.data = data
        })
        
        cy.viewport(1920, 1080);
        homePage.navigate();
        editPage.goToApps();
        
        //create addont for sorting
        editPage.selectStyledSignOffAddon();
        signOffComp.createSignOffAddon('signature', 'None', 'Iuliia Kolisnichenko', 'default', 'maximum');
        
        editPage.selectStyledSignOffAddon();
        signOffComp.createSignOffAddon('signoff', 'Best regards,', 'none', 'Plain', 'minimum');

        editPage.selectGreenFooterAddon();
        greenFooterComp.createGreenFooterAddon('Save a tree - kill a beaver', 'green-leaf', 'minimum', '#1ba2eb');        
    })

    it('Checking the display and modification of addons', () => {
        //verify that in the main Active Addons are only SignOff
        editPage.getMainAddonsNames().each(el => { expect(el.text()).eq(data.mainAddon) });

        //verify that in additional Active Addons is only Green footer
        editPage.getAdditionalAddonsNames().each(el => { expect(el.text()).eq(data.additionalAddon) });
        
        //change sorting. Move Green footer in the Main Active Addons
        editPage.moveGreenAddonBetweenSignOff();

        //verify than Green footer moved between first and second SignOff
        const addonNames_0 = [];
        editPage.getMainAddonsNames().each(el => { addonNames_0.push(el.text()) })
        .then(() => {
            expect(addonNames_0).to.deep.equal(data.orderBeforeDeletingAddon);
        });
        
        //verify that additional Addons area is empty
        editPage.getAdditionalAddonsNames().should('not.exist');

        //remove the topest SingnOff addon
        editPage.removeAddon(2);

        //verify than Green footer left in the Main Active Addons
        const addonNames_1 = [];
        editPage.getMainAddonsNames().each(el => { addonNames_1.push(el.text()) })
        .then(() => {
            expect(addonNames_1).to.deep.equal(data.orderAfterDeletingAddon);
        });

        //verify that additional Addons area is empty
        editPage.getAdditionalAddonsNames().should('not.exist');

    });
}); 