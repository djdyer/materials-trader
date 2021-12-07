const router = require('express').Router()

const { Material, Listing, User} = require('../models')

// Import the custom middleware
const withAuth = require('../utils/auth')

// get homepage
router.get('/', async (req, res) => {
  try {
    console.log('>>>>>>>>>> GET / home route <<<<<<<<<<<<<<<<<')

        const postData = await Listing.findAll({
          include: [
            {
              model: User,
              attributes: ['username'],
            },

            {
              model: Material,
              attributes: ['type'],
            },
          ],
        });

        const listings = postData.map((topic) =>
          topic.get({ plain: true })
        );
console.log(listings)
    res.status(200).render('home', {
      listings,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/listing', withAuth, async (req, res) => {
  console.log('>>>>>>>>>> GET /listing route <<<<<<<<<<<<<<<<<')
  try {
    console.log("session.user_id:",req.session.user_id)
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Listing }],
    });
console.log("userData:",userData)
    const users = userData.get({ plain: true });
    console.log(users)
    res.render('listing', {
      ...users,
      loggedIn: req.session.loggedIn
    });
  } 
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// User clicks on profile without Auth, must first login
router.get('/login', (req, res) => {
  console.log('>>>>>>>>>>>>>>> GET /login redirect to /profile route <<<<<<<<<<<<<<<<<<')
  if (req.session.loggedIn) {
    res.redirect('/profile')
    return
  }
  res.render('login')
});

router.get('/signup', (req, res) => {
  console.log('>>>>>>>>>>>>>>> GET /signup redirect to /profile route <<<<<<<<<<<<<<<<<<')
  if (req.session.loggedIn) {
    res.redirect('/profile');
  }
  //   res.redirect('/profile')
  //   return
  // }
  res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    console.log('>>>>>>>>>> GET / profile route <<<<<<<<<<<<<<<<<')

        const postData = await Listing.findAll({
          include: [
            {
              model: Material,
            }],
          });
          const listings = postData.map((post) =>
          post.get({ plain: true })
          );
          
          console.log(listings);
    res.render('profile', {
      listings,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router
