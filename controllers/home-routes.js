const router = require('express').Router()

const { Material, Listing, User} = require('../models')

// Import the custom middleware
const withAuth = require('../utils/auth')

// GET homepage
router.get('/', async (req, res) => {
  try {
    console.log('>>>>>>>>>> / home route <<<<<<<<<<<<<<<<<')

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
})
router.get('/listing/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const listingData = await Listing.findByPk(req.params.id)
    const listing = listingData.get({ plain: true });
    console.log(listing)
    res.render('listing', {
      
      listing
    });
  } 
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});









// User clicks on profile without Auth, must first login
router.get('/login', (req, res) => {
  console.log('>>>>>>>>>>>>>>> /login redirect route <<<<<<<<<<<<<<<<<<')
  if (req.session.loggedIn) {
    res.redirect('/profile')
    return
  }
  res.render('login')
});

router.get('/signup', (req, res) => {
  console.log('>>>>>>>>>>>>>>> /login redirect route <<<<<<<<<<<<<<<<<<')
  if (req.session.loggedIn) {
    res.redirect('/profile')
    return
  }
  res.render('signup')
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    console.log('>>>>>>>>>> / profile route <<<<<<<<<<<<<<<<<')

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
