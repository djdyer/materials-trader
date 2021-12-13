const router = require('express').Router()
const { Material, Listing, User } = require('../models')
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
    })

    const listings = postData.map((listing) => listing.get({ plain: true }))
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

// get specific listing
router.get('/listing/:id', async (req, res) => {
  console.log('>>>>>>>>>>>>>>> GET route to /listing/:id <<<<<<<<<<<<<<<')
  console.log('session', req.session)
  console.log('user_id', req.session.user_id)
  try {
    // Find the logged in user based on the session ID
    const listingData = await Listing.findByPk(req.params.id, {
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
    })
    const listing = listingData.get({ plain: true })
    console.log('listing:', listing)
    console.log('listing.user_id:', listing.user_id)
    console.log('listing.user_id:', listing.user_id)
    console.log('listing.user_id:', listing.user_id)
    if (req.session.loggedIn && req.session.user_id == listing.user_id) {
      res.render('edit', { listing, loggedIn: req.session.loggedIn })
    } else {
      res.render('listing', { listing, loggedIn: req.session.loggedIn })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// SAME FUNCTION AS ABOVE??
router.get('/listing/:id', async (req, res) => {
  console.log('>>>>>>>>>>>>>>> GET route to /listing/:id <<<<<<<<<<<<<<<')
  console.log('session', req.session)
  console.log('user_id', req.session.user_id)
  try {
    // Find the logged in user based on the session ID
    const listingData = await Listing.findByPk(req.params.id, {
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
    })
    const listing = listingData.get({ plain: true })

    if (req.session.loggedIn && req.session.user_id == listing.user_id) {
      res.render('edit', { listing, loggedIn: req.session.loggedIn })
    } else {
      res.render('listing', { listing, loggedIn: req.session.loggedIn })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// Get form to create a new listing
router.get('/newlisting', async (req, res) => {
  console.log('>>>>>>>>>>>>>>> GET /newlisting route <<<<<<<<<<<<<<<<<<')
  // res.render('create');

  // Get a list of legitimate materials
  const dbMaterialData = await Material.findAll()

  const materials = dbMaterialData.map((material) =>
    material.get({ plain: true }),
  )

  console.log(materials)
  res
    .status(200)
    .render('create', { materials: materials, loggedIn: req.session.loggedIn })
})

// GET the form to edit a listing
router.get('/editlisting/:id', withAuth, async (req, res) => {
  console.log(
    '>>>>>>>>>>>>>>> /editlisting/',
    req.params.id,
    'GET route <<<<<<<<<<<<<<<<',
  )
  try {
    const dbListingData = await Listing.findByPk(req.params.id, {
      include: [
        {
          model: Material,
          attributes: ['type', 'id'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })

    const listing = dbListingData.get({ plain: true })
    console.log('listing:', listing)
    res.render('edit', { listing, loggedIn: req.session.loggedIn })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// User clicks on profile without Auth, must first login
router.get('/login', (req, res) => {
  console.log(
    '>>>>>>>>>>>>>>> GET /login redirect to /profile route <<<<<<<<<<<<<<<<<<',
  )
  if (req.session.loggedIn) {
    res.redirect('/profile')
    return
  }
  res.render('login')
})

router.get('/signup', (req, res) => {
  console.log(
    '>>>>>>>>>>>>>>> GET /signup redirect to /profile route <<<<<<<<<<<<<<<<<<',
  )
  if (req.session.loggedIn) {
  }
  //   res.redirect('/profile')
  //   return
  // }
  res.render('signup')
})

// Logout sends back to home
router.get('/logout', (req, res) => {
  req.session.loggedIn = false
  res.redirect('/')
  return
})

// Search sends back to home with filtered results
router.get('/search', (req, res) => {
  res.render('search')
  return
})

// goes to about page
router.get('/about', (req, res) => {
  res.render('about')
  return
})

// SEARCH materials
router.get('/searchmaterial/:id', async (req, res) => {
  try {
    const searchData = await Listing.findAll({
      where: {
        material_id: req.params.id,
      },
    })

    if (!searchData) {
      res.status(404).json({ message: 'No listing found with this id!' })
      return
    }

    const listings = searchData.map((listing) => listing.get({ plain: true }))
    console.log(listings, 'This is our filtered result')

    res.status(200).render('results', {
      listings,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Go to profile only if logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    console.log('>>>>>>>>>> GET / profile route <<<<<<<<<<<<<<<<<')

    const postData = await Listing.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Material,
        },
        {
          model: User,
        },
      ],
    })
    const listings = postData.map((post) => post.get({ plain: true }))
    res.render('profile', {
      listings,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
