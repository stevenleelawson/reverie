exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('robots', (table) => {
      table.increments('id').primary();
      table.string('date_added');
      table.string('first_active');
      table.string('current_name');
      table.string('height');
      table.string('weight');
      table.integer('intelligence_metric');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('robots')
  ])
};
