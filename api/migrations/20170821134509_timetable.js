
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('bookings').createTable('bookings', model=> {
    	model.increments('id').primary();
    	model.integer('user_id');
    	model.dateTime('start');
    	model.dateTime('end');
    	model.enu('status', ['available', 'booked']).defaultTo('available');
    	model.integer('request_id');
    }).then(table => {
    	console.log('created bookings table');
    }),
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('bookings'),
    ])
};
