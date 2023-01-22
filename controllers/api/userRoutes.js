const router = require('express').Router();
const { User, Image } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/info', async (req,res) => {
  try {
    const user = (await User.findByPk(req.session.user_id))
    if (!user) {
      res.json({id: 0, username: 'Guest', email: null})
      return
    }
    user = user.dataValues
    delete user.password
    console.log(user)
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get('/:userId/drawings', async (req, res) => {
  const requirements = {user_id: req.params.userId}
  if (req.params.userId!==req.session.userId) requirements.public = true
  const userDrawings = await Image.findAll({ where: requirements })
  console.log(userDrawings)
  res.status(200).json(userDrawings)
})

module.exports = router;
