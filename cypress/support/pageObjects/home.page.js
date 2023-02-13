require('@4tw/cypress-drag-drop')

class HomePage {
    navigate = () => {
        cy.visit("https://webapp.wisestamp.com/")
    }
}

export default HomePage