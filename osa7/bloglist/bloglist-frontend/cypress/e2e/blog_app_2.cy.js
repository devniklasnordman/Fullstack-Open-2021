describe('Blog ', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const newUser = {
			username: 'timo',
			name: 'Testi Timppa',
			password: 'salatimppa',
		}
		cy.request('POST', 'http://localhost:3003/api/users/', newUser)
		cy.visit('http://localhost:5173')
	})
	it('Login form is visible', function () {
		cy.get('input[name="Username"]').should('be.visible')
		cy.get('input[name="Password"]').should('be.visible')
	})

	describe('when logged in', function () {
		beforeEach(function () {
			// Correct credentials
			cy.contains('login').click()
			cy.get('input:first').type('timo')
			cy.get('input:last').type('salatimppa')
			cy.contains('login').click()
		})

		it('creates a new blog with logged in user', function () {
			cy.contains('new blog').click()
			cy.get('input:first').type('Tomi testaa!')
			cy.get('input').eq(1).type('Testi Timppa')
			cy.get('input:last').type('www.testitimppa.fi')
			cy.contains('save').click()
			cy.contains('a new blog')
		})

		it('Adding likes to a blog', function () {
			// Create
			cy.contains('new blog').click()
			cy.get('input:first').type('Tomi testaa!')
			cy.get('input').eq(1).type('Testi Timppa')
			cy.get('input:last').type('www.testitimppa.fi')
			cy.contains('save').click()
			// Like
			cy.contains('view').parent().find('button').eq(0).click()
			cy.contains('like').parent().find('button').eq(0).click()

			cy.pause()
			// And check likes
			cy.contains('likes').parent().should('contain', '1')
		})
	})

	it('Use incorrect credentials', function () {
		cy.contains('login').click()
		cy.get('input:first').type('maija')
		cy.get('input:last').type('mehilainen')
		cy.contains('login').click()

		cy.contains('wrong username or password')
	})
})
