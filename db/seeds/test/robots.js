
exports.seed = function(knex, Promise) {
  return knex('robots').del()
    .then(() => {
      return knex('robots').insert([
        {
          date_added: '12/02/1982',
          first_active: '05/07/2018',
          current_name: 'Esteban',
          height: '56 in',
          weight: '120 lbs',
          intelligence_metric: 5
        }
      ]);
    })
    .catch(error => {
      console.log(`Error seeding data: ${error}`)
    })
};
