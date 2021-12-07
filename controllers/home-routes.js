const router = require('express').Router()
const { Material, Post, User} = require('../model')
// Import the custom middleware
const withAuth = require('../utils/auth')

// GET homepage
router.get('/', async (req, res) => {
  try {
    console.log('>>>>>>>>>> / home route <<<<<<<<<<<<<<<<<')

        const postData = await Post.findAll({
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

        const posts = postData.map((topic) =>
          topic.get({ plain: true })
        );
console.log(posts)
    res.status(200).render('home', {
      posts,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

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

        const postData = await Post.findAll({
          include: [
            {
              model: Material,
            }],
          });
          const posts = postData.map((post) =>
          post.get({ plain: true })
          );
          
          console.log(posts);
    res.render('profile', {
      posts,
      loggedIn: req.session.loggedIn,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router
