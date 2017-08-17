//import User from 'src/server/models/user';

export default (req, res, next) => {
	console.log(JSON.stringify(req.params));
	/* User.find({ email }, (err, result) => {
		if (err) throw err;

		res.json(result);
		next();
	}); */
	res.json(req.params);
}