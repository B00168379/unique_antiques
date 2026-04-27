// This test checks if date for login are entered correctly

function testLogin() {

  // user input
  const email = "test@test.com";
  const password = "1234";

  // check if fields are not empty
  if (email !== "" && password !== "") {
    console.log("PASS: Login fields are valid");
  } else {
    console.log("FAIL: Login fields are empty");
  }

}

// run the function test
testLogin();