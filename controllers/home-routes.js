const router = require('express').Router()
const { Topic, Post, Comment } = require('../model')
// Import the custom middleware
const withAuth = require('../utils/auth')

// GET homepage
router.get('/', async (req, res) => {
  try {
    console.log('>>>>>>>>>> / route <<<<<<<<<<<<<<<<<')

    //     const dbTopicData = await Topic.findAll({
    //       include: [
    //         {
    //           model: Post,
    //           attributes: ['content'],
    //         },
    //       ],
    //     });

    //     const topics = dbTopicData.map((topic) =>
    //       topic.get({ plain: true })
    //     );

    res.render('home', {
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  console.log('>>>>>>>>>>>>>>> /login redirect route <<<<<<<<<<<<<<<<<<')
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }

  res.render('login')
})
router.get('/signup', (req, res) => {
  console.log('>>>>>>>>>>>>>>> /login redirect route <<<<<<<<<<<<<<<<<<')
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }

  res.render('signup')
})

module.exports = router
