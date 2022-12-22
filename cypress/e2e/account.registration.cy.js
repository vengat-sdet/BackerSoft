const { internet, name, address, phone} = require("faker");
const username = internet.userName();
const password = internet.password();
const firstName = name.firstName();
const lastName = name.lastName();
const street = address.streetAddress();
const city = address.city();
const state = address.state();
const zipCode = address.zipCode();
const phoneNumber = phone.phoneNumber();


describe("Account registration", () => {
  beforeEach(() => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
  });

  context(`when user is in home page and clicks "Register" link`, () => {
    it(`redirects user to sign up page`, () => {
      cy.get("#loginPanel").contains("Register").click();

      cy.url().should("include", "/register.htm");
    });

    it.skip(`shows "something went wrong, Please try again later" message when signup page failed to load`, () => {
      cy.get("#loginPanel").contains("Register").click();

      //The below assertion will be implemented based on error implementation in the DOM currently there is no scope of it
      cy.url().should("include", "/index.htm");
    });
  });

  context(`when user is in Signup form and clicks register button`, () => {
    it(`shows "Your account created successfully" message when the form is filled properly`, () => {
      cy.get("#loginPanel").contains("Register").click();
      cy.get('[id="customer.firstName"]').click();
      cy.get('[id="customer.firstName"]').type(firstName);
      cy.get('[id="customer.lastName"]').click();
      cy.get('[id="customer.lastName"]').type(lastName);
      cy.get('[id="customer.address.street"]').type(street);
      cy.get('[id="customer.address.city"]').type(city);
      cy.get('[id="customer.address.state"]').type(state);
      cy.get('[id="customer.address.zipCode"]').type(zipCode);
      cy.get('[id="customer.phoneNumber"]').type(phoneNumber);
      cy.get('[id="customer.ssn"]').type("Number");
      cy.get('[id="customer.username"]').type(username);
      cy.get('[id="customer.password"]').type(password);
      cy.get("#repeatedPassword").type(password);
      cy.get('[type="submit"]').contains("Register").click();
      cy.get("#rightPanel").should(
        "include.text",
        "Your account was created successfully. You are now logged in."
      );
    });

    it(`shows error message when user enters an already exisiting username`, () => {
      cy.get("#loginPanel").contains("Register").click();
      cy.get('[id="customer.firstName"]').click();
      cy.get('[id="customer.firstName"]').type(firstName);
      cy.get('[id="customer.lastName"]').click();
      cy.get('[id="customer.lastName"]').type(lastName);
      cy.get('[id="customer.address.street"]').type(street);
      cy.get('[id="customer.address.city"]').type(city);
      cy.get('[id="customer.address.state"]').type(state);
      cy.get('[id="customer.address.zipCode"]').type(zipCode);
      cy.get('[id="customer.phoneNumber"]').type(phoneNumber);
      cy.get('[id="customer.ssn"]').type("Number");
      cy.get('[id="customer.username"]').type(username);
      cy.get('[id="customer.password"]').type(password);
      cy.get("#repeatedPassword").type(password);
      cy.get('[type="submit"]').contains("Register").click();
      cy.get('[id="customer.username.errors"]').should(
        "have.text",
        "This username already exists."
      );
    });

    it(`shows error message when user entered password in password confirmation field mismatches`, () => {
      cy.get("#loginPanel").contains("Register").click();
      cy.get('[id="customer.firstName"]').click();
      cy.get('[id="customer.firstName"]').type(firstName);
      cy.get('[id="customer.lastName"]').click();
      cy.get('[id="customer.lastName"]').type(lastName);
      cy.get('[id="customer.address.street"]').type(street);
      cy.get('[id="customer.address.city"]').type(city);
      cy.get('[id="customer.address.state"]').type(state);
      cy.get('[id="customer.address.zipCode"]').type(zipCode);
      cy.get('[id="customer.phoneNumber"]').type(phoneNumber);
      cy.get('[id="customer.ssn"]').type("Number");
      cy.get('[id="customer.username"]').type(username);
      cy.get('[id="customer.password"]').type(password);
      cy.get("#repeatedPassword").type("wrongpassword");
      cy.get('[type="submit"]').contains("Register").click();
      cy.get('[id="repeatedPassword.errors"]').should(
        "have.text",
        "Passwords did not match."
      );
    });

    it(`shows error messages when no data is enetered in any fields`, () => {
      cy.get("#loginPanel").contains("Register").click();
      cy.get('[type="submit"]').contains("Register").click();
      cy.get('[id="customer.firstName.errors"]').should(
        "have.text",
        "First name is required."
      );
      cy.get('[id="customer.lastName.errors"]').should(
        "have.text",
        "Last name is required."
      );
      cy.get('[id="customer.address.street.errors"]').should(
        "have.text",
        "Address is required."
      );
      cy.get('[id="customer.address.city.errors"]').should(
        "have.text",
        "City is required."
      );
      cy.get('[id="customer.address.state.errors"]').should(
        "have.text",
        "State is required."
      );
      cy.get('[id="customer.address.zipCode.errors"]').should(
        "have.text",
        "Zip Code is required."
      );
      // Possible Defect missing error implementation for phone number field
      //cy.get('[id="customer.phoneNumber.errors"]')
      cy.get('[id="customer.ssn.errors"]').should(
        "have.text",
        "Social Security Number is required."
      );
      cy.get('[id="customer.username.errors"]').should(
        "have.text",
        "Username is required."
      );
      cy.get('[id="customer.password.errors"]').should(
        "have.text",
        "Password is required."
      );
      cy.get('[id="repeatedPassword.errors"]').should(
        "have.text",
        "Password confirmation is required."
      );
    });
  });
});
