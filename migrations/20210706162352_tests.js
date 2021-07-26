
exports.up = function(knex) {
  return knex.schema.createTable('tests', table => {
    table.increments('test_id'); // adds an auto incrementing PK column
    table.string('first_name');
    table.string('last_name');
    table.string('gender');
    table.integer('age');
    table.integer('push_ups');
    table.float('push_ups_score');
    table.integer('sit_ups');
    table.float('sit_ups_score');
    table.time('run_time');
    table.float('run_time_score');
    table.float('total_score');
    table.date('test_date');
});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tests');
};
