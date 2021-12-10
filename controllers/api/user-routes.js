const router = require('express').Router();
const { User, Listing, Material } = require('../../models');

// SIGN-UP
router.post('/', async (req, res) => {
  console.log(">>>>>>>>>> POST / sign-up route <<<<<<<<<<<<<");

  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now signed up and logged in!' });

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  console.log(">>>>>>>>>> POST /login route <<<<<<<<<<<<<");
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUTS EDITED listing
router.put('/updatelisting/:id', async (req, res) => {
  console.log(">>>>>>>>>> PUT /updatelisting/:id route <<<<<<<<<<<<<");
  console.log("req.body",req.body)
  try {
    const dbListingReturn = await Listing.update(
      {
        description: req.body.description,
        amount: req.body.amount,
        contact: req.body.contact,
        location: req.body.location
      },
      {
      where: {
        id: req.body.listing_id
      }
    });

    if (!dbListingReturn) {
      res
        .status(400)
        .json({ message: 'Listing not found; nothing updated!' });
      return;
    }
    dbListingData = await Listing.findByPk(req.body.listing_id);

    const listing = dbListingData.get({ plain: true });
    console.log("listing:",listing);
    res.status(200).render('home', {
      listing,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE listing
router.post('/createlisting', async (req, res) => {
  console.log(">>>>>>>>>> POST /createlisting route <<<<<<<<<<<<<");
  console.log("req.body",req.body)
  try {
    let dbListingData = await Listing.create({
      material_id: req.body.material_id,
      description: req.body.description,
      amount: req.body.amount,
      location: req.body.location,
      user_id: req.session.user_id,
      contact: req.body.contact
    });

    dbListingData = await Listing.findAll({
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

    const listings = dbListingData.map((listing) =>
      listing.get({ plain: true })
    );
console.log(listings)
res.status(200).render('home', {
  listings,
  loggedIn: req.session.loggedIn,
})
} catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// DELETE listing
router.delete('/deletelisting/:id', async (req, res) => {
  try {
    const listingData = await Listing.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!listingData) {
      res.status(404).json({ message: 'No listing found with this id!' });
      return;
    }

    dbListingData = await Listing.findAll({
      where: {
        user_id: req.session.user_id
      },
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

    const listings = dbListingData.map((listing) =>
      listing.get({ plain: true })
    );
console.log(listings)

    res.status(200).render('profile', {
      listings,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  console.log(">>>>>>>>>> POST /logout route <<<<<<<<<<<<<");
  if (req.session.loggedIn) {
    console.log(">>>>>>>>> Not logged in, so nothing to destroy! <<<<<<")
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
