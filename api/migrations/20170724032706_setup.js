
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users').createTable('users', user => {
            user.increments('id').primary();
            user.string('name');
            user.string('email').unique();
            user.string('password');
            user.enu('role', ['client', 'employee', 'admin']).defaultTo('client');
            user.enu('gender', ['male', 'female', 'gender']).defaultTo('male');
            user.string('token');
            user.string('phone');
            user.boolean('verified');
            user.string('sms_code');
            user.timestamp('created_at').defaultTo(knex.raw('now()'));
        }).then(table => {
            console.log('Created Table', table);
        }),
        
        knex.schema.dropTableIfExists('logs').createTable('logs', log => {
            log.increments('id').primary();
            log.integer('user_id');
            log.string('username');
            log.string('action');
            log.string('action_key');
            log.string('action_data');
            log.timestamp('created_at').defaultTo(knex.raw('now()'));
        }).then(table => {
            console.log('Created Table', table);
        }),
        
        knex.schema.dropTableIfExists('requests').createTable('requests', request => {
            request.increments('id').primary();
            request.integer('user_id');
            request.string('name');
            request.string('phone');
            request.string('comment');
            request.enu('gender', ['male', 'female', 'other']).defaultTo('male');
            request.dateTime('request_time');
            request.string('location');
            request.enu('status', ['open', 'assigned', 'completed']).defaultTo('open');
            request.integer('handler_id');
            request.string('handler_name');
            request.timestamp('created_at').defaultTo(knex.raw('now()'));
        }).then(table => {
            console.log('Created Table', table);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('users'),
        knex.schema.dropTableIfExists('requests'),
        knex.schema.dropTableIfExists('logs')
    ]);
};
