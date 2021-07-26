
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tests').del()
    .then(function () {
      // Inserts seed entries
      return knex('tests').insert([
        {test_id: 1, first_name: 'Joseph', last_name: 'Hahn', gender: 'male', age: 24, push_ups: 79, push_ups_score: 30.0, sit_ups: 80, sit_ups_score: 30.0, run_time: '11:23', run_time_score: 40.0, total_score: 100.0, test_date: '2019-11-1'},
        {test_id: 2, first_name: 'Carlos', last_name: 'Gahn', gender: 'male', age: 34, push_ups: 79, push_ups_score: 40.0, sit_ups: 90, sit_ups_score: 30.0, run_time: '11:23', run_time_score: 40.0, total_score: 100.0, test_date: '2020-11-19'},
        {test_id: 3, first_name: 'Jay', last_name: 'Fahn', gender: 'female', age: 4, push_ups: 89, push_ups_score: 30.0, sit_ups: 80, sit_ups_score: 30.0, run_time: '11:23', run_time_score: 40.0, total_score: 100.0, test_date: '2021-01-04'}
     
      ]);
    });
};
