//Allows the user to stay in a stagnent possition while a modal is open and is able to bring the user back to their original possition when the modal is closed.
const showDialog = () => {
  const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
  const body = document.body;
  body.style.position = "fixed";
  body.style.top = `-${scrollY}`;
  document.getElementById("hideLogo").style.display = "none";
};
const closeDialog = () => {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = "";
  body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
  document.getElementById("hideLogo").style.display = "block";
};
window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});
window.onscroll = function () {
  scrollFunction();
};

//This function allows the nav logo to disappear when the user reaches a height of 355px and for a smaller logo on the nav bar to appear
function scrollFunction() {
  if (
    document.body.scrollTop > 355 ||
    document.documentElement.scrollTop > 355
  ) {
    document.getElementById("logo").style.display = "none";
    document.getElementsByClassName("navlogo")[0].style.display = "block";
    document.getElementsByClassName("navlogo")[0].classList.add("logoAnim");
  } else {
    document.getElementById("logo").style.display = "block";
    document.getElementsByClassName("navlogo")[0].style.display = "none";
    document.getElementsByClassName("navlogo")[0].classList.remove("logoAnim");
  }
}
//
function modalOpen(id) {
  document.getElementById(id).style.display = "block";
}
function modalClose(id) {
  document.getElementById(id).style.display = "none";
}

// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user !== null) {
    console.log("user logged in: ", user.uid);
    document.getElementsByClassName("loggedIn").style.display = "block";
    document.getElementsByClassName("loggedOut").style.display = "none";
    useruid = user.uid;
  } else {
    console.log("user logged out");
    document.getElementsByClassName("loggedIn").style.display = "none";
    document.getElementsByClassName("loggedout").style.display = "block";
  }
});
//get Database data
firebase
  .database()
  .ref()
  .once("value")
  .then((snapshot) => {
    // queryContent(snapshot);
  });

//Google authentication
function googleLogin() {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase.auth().useDeviceLanguage();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage);
    });
}

// user sign up with email

const signUpForm = document.querySelector("#signupForm");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signUpForm["signupEmail"].value;
  const password = signUpForm["signupPassword"].value;

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector("#id02");
    modalClose("id02");
    signUpForm.reset();
  });
});

// user sign-out
// const logout = document.querySelector("#logout");
// logout.addEventListener("click", (e) => {
//   e.preventDefault();
//   auth.signOut();
// });
function logout() {
  auth.signOut();
}

// user sign in
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm["loginEmail"].value;
  const password = loginForm["loginPassword"].value;

  // sign user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    modalClose("id03");
    loginForm.reset();
  });
});

function titleFunction(e) {
  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid;
  } else {
    console.log("something went wrong...");
  }
  firebase
    .database()
    .ref("/users/" + uid + "/queries/query_title")
    .set(e);
}

function bodyFunction(e) {
  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid;
  } else {
    console.log("something went wrong...");
  }
  firebase
    .database()
    .ref("/users/" + uid + "/queries/query_body")
    .set(e);
}

// function contactFunction(contactTitle, contactBody) {
//   firebase.database().ref("/users/queries").set({
//     query_title: contactTitle,
//     query_body: contactBody,
//   });
// }

// const contactForm = document.querySelector("#contactQuery");
// signUpForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //get user info
//   const title = signUpForm["queryTitle"].value;
//   const password = signUpForm["queryBody"].value;

// });
