describe('Blog app', function () {
	beforeEach(function () {
		cy.visit('http://localhost:5173')
		//cy.request('POST', 'http://localhost:3003/api/testing/reset')
	})

	it('Login form is shown', function () {
		cy.contains('login').click()
		cy.get('input[name="Username"]').should('be.visible')
		cy.get('input[name="Password"]').should('be.visible')
		cy.log('Before checking submit button visibility')
		cy.get('input[type="submit"]').should('be.visible', { timeout: 10000 })
		cy.log('After checking submit button visibility')
	})
})
