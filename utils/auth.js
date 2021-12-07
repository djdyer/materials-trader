const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the home page
  if (!req.session.loggedIn) {
    console.log(">>>>>>>>>>>>>>>>>>>>> auth redirect to / <<<<<<<<<<<<<<<<<")
    res.redirect("/");
  } else {
    // If the user is logged in, execute the route function that will allow them to view the dash
    next();
  }
};

module.exports = withAuth;
