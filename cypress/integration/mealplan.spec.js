describe('MealplanList', () => {
  it('allows changing the title', () => {
    cy.visit('/');

    cy.get('[name="listtitle"]').type('Tuesday');
    cy.get('[name="listtitle"]').should('have.value', 'Tuesday');

    cy.get('[name="listtitle"]').clear().type('Wednesday');
    cy.get('[name="listtitle"]').should('have.value', 'Wednesday');
  });

  it('allows to add meals', () => {
    cy.visit('/');

    cy.get('#meals li').eq(0).type('Burritos');
    cy.get('#meals li:eq(0) input[type=text]').should('have.value', 'Burritos');

    cy.get('[name="addbutton"]').click();

    cy.get('#meals li').eq(1).type('Falafel Wrap');
    cy.get('#meals li:eq(1) input[type=text]').should(
      'have.value',
      'Falafel Wrap'
    );

    cy.get('[name="addbutton"]').click();

    cy.get('#meals li').eq(2).type('Yakisoba');
    cy.get('#meals li:eq(2) input[type=text]').should('have.value', 'Yakisoba');
  });

  it('allows to rename the first meal', () => {
    cy.visit('/');

    cy.get('#meals li:eq(0) input[type=text]').clear();
    cy.get('#meals li:eq(0) input[type=text]').should('have.value', '');

    cy.get('#meals li').eq(0).type('Tacos');
    cy.get('#meals li:eq(0) input[type=text]').should('have.value', 'Tacos');
  });

  it('allows to check and uncheck meals and strike out the checked ones', () => {
    cy.visit('/');

    cy.get('#meals li').eq(0).type('Burritos');
    cy.get('[name="addbutton"]').click();
    cy.get('#meals li').eq(1).type('Falafel Wrap');
    cy.get('[name="addbutton"]').click();
    cy.get('#meals li').eq(2).type('Yakisoba');

    cy.get('#meals li:eq(2) input[type=checkbox]').check();
    cy.get('#meals li:eq(2) input[type=checkbox]').should('be.checked');
    cy.get('#meals li:eq(2) input[type=text]').should(
      'have.css',
      'text-decoration',
      'line-through solid rgb(124, 128, 126)'
    );

    cy.get('#meals li:eq(0) input[type=checkbox]').check();
    cy.get('#meals li:eq(0) input[type=checkbox]').should('be.checked');
    cy.get('#meals li:eq(0) input[type=text]').should(
      'have.css',
      'text-decoration',
      'line-through solid rgb(124, 128, 126)'
    );

    cy.get('#meals li:eq(2) input[type=checkbox]').uncheck();
    cy.get('#meals li:eq(2) input[type=checkbox]').should('not.be.checked');
  });

  it('gives focus to lastly added input field', () => {
    cy.visit('/');

    cy.get('#meals li').eq(0).type('Burritos');
    cy.get('#meals li:eq(0) input[type=text]').should('have.value', 'Burritos');

    cy.get('[name="addbutton"]').click();
    cy.get('body').type('Falafel Wrap');
    cy.get('#meals li:eq(1) input[type=text]').should(
      'have.value',
      'Falafel Wrap'
    );

    cy.get('[name="addbutton"]').click();
    cy.get('body').type('Yakisoba');
    cy.get('#meals li:eq(2) input[type=text]').should('have.value', 'Yakisoba');
  });

  it('adds an empty meal input after pressing enter', () => {
    cy.visit('/');

    cy.get('#meals li:eq(0) input[type=text]').type('Burritos');

    cy.get('[name="addbutton"]').click();
    cy.get('#meals li:eq(1) input[type=text]').type('Falafel Wrap');

    cy.get('[name="addbutton"]').click();
    cy.get('#meals li:eq(2) input[type=text]').type('Yakisoba');

    cy.get('#meals li:eq(1) input[type=text]').type('{enter}');
    cy.get('body').type('Schnitzel');
    cy.get('#meals li:eq(2) input[type=text]').should(
      'have.value',
      'Schnitzel'
    );

    cy.get('#meals li:eq(3) input[type=text]').should('have.value', 'Yakisoba');
  });

  it('deletes the meal in focus when delete button is clicked', () => {
    cy.visit('/');

    cy.get('#meals li:eq(0) input[type=text]').type('Burritos');

    cy.get('[name="addbutton"]').click();
    cy.get('#meals li:eq(1) input[type=text]').type('Falafel Wrap');

    cy.get('[name="addbutton"]').click();
    cy.get('#meals li:eq(2) input[type=text]').type('Yakisoba');

    cy.get('#meals li:eq(1) input[type=text]').type('{enter}');
    cy.get('body').type('Schnitzel');

    cy.get('#meals li:eq(3) input[type=text]').click();
    cy.wait(1000);

    cy.get('#meals li:eq(3) button[name=deletebutton]').click();
  });

  it('saves mealplanlist to local storage', () => {
    cy.visit('/');

    cy.get('[name="listtitle"]').type('Tuesday');
    cy.get('#meals li:eq(0) input[type=text]').type('Burritos');
    cy.get('[name="addbutton"]').click();
    cy.get('#meals li:eq(1) input[type=text]').type('Falafel Wrap');
    cy.get('[name="addbutton"]').click();
    cy.get('#meals li:eq(2) input[type=text]').type('Yakisoba');
    cy.get('#meals li:eq(2) input[type=checkbox]').check();

    cy.reload();

    cy.get('[name="listtitle"]').should('have.value', 'Tuesday');
    cy.get('#meals li:eq(0) input[type=text]').should('have.value', 'Burritos');
    cy.get('#meals li:eq(1) input[type=text]').should(
      'have.value',
      'Falafel Wrap'
    );
    cy.get('#meals li:eq(2) input[type=text]').should('have.value', 'Yakisoba');
    cy.get('#meals li:eq(2) input[type=checkbox]').should('be.checked');
  });
});
