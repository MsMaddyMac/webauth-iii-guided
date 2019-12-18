const router = require('express').Router();

# JWT Notes

## Practice

In a very localized app such as grocery deliver,

in the landing page it asks you for your zipcode (even if you're not logged in).. it remembers your selection even if close the application,

- we need a storage mechanism on the client.
    - local storage

- how do we send the data to the server?

then the server renders only the available groceries based on that particular zipcode.



const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole, (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

// if you are wanting to check role too you would create this middleware in another file and add it as a parameter above
function checkRole(role) {
	return function(req, res, next) {
		if (req.token && role === req.token.role) {
			next();
		} else {
			res.status(403).json({ message: 'You have no power here, you must be a ${role}.' });
		}
	};
}
module.exports = router;
