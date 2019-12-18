const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

// if you are wanting to check role too you would create this middleware in another file and add it as a parameter above
// function checkRole(role) {
// 	return function(req, res, next) {
// 		if (req.token && role === req.token.role) {
// 			next();
// 		} else {
// 			res.status(403).json({ message: 'You have no power here, you must be a ${role}.' });
// 		}
// 	};
// }
module.exports = router;
