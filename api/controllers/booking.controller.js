import Booking from '../models/booking.js';

export const addAvailable = async (req, res) => {
	const user = req.user.toJSON();
	const { start, end } = req.body;

	const newAvailable = new Booking({
		user_id: user.id,
		start: start,
		end: end,
	});

	try {
		await newAvailable.save();
		return res.json(newAvailable.toJSON());		
	} catch (err) {
		return res.status(405).json(err);
	}
}

export const setBooked = async (req, res) => {

}

export const getAvailable = async (req, res) => {
	const user = req.user.toJSON();
	const query = req.query;
	query.status = 'available';
	try {
		const availables = await Booking.where(query).fetchAll();
		res.json(availables.toJSON());
	} catch (err) {
		res.status(405).json(err);
	}
}

export const getBooked = async (req, res) => {
	
}

export const getAll = async (req, res) => {
	const user = req.user.toJSON();
	try {

		const allBookings = await Booking.where({'user_id': user.id}).fetchAll();		
		
		if (allBookings) 
			return res.json(allBookings.toJSON())

		return res.json([]);
	
	} catch (err) {
		console.log(err);
		res.status(405).json(err);
	}
}

export const query = async (req, res) => {
	const user = req.user.toJSON();
	let query = req.body.query;
	query = Object.assign(query, {user_id: query.user_id ? query.user_id : user.id});
	console.log(query);
	try {

		const results = await Booking.where(query).fetchAll();		
		if (results) 
			return res.json(results.toJSON());

		return res.json([]);
	
	} catch (err) {
		console.log(err);
		res.status(405).json(err);
	}	
}

export const deleteAvailable = async(req, res) => {
	const user = req.user.toJSON();
	const { id } = req.query;
	console.log(id);
	try {

		await new Booking({id: id}).destroy();
		const results = await Booking.where({user_id: user.id}).fetchAll();
		if (results)
			return res.json(results.toJSON());

		return res.json([]);

	} catch (err) {
		res.status(405).json(err);
	}
}
