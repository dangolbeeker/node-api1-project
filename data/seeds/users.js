exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          name: 'Samwise Gamgee',
          bio: 'Gardener and poet. Married to Rose Cotton',
        },
        {
          name: 'Scott Beeker',
          bio: 'Software Engineer',
        },
        {
          name: 'Frodo Baggins',
          bio: 'The ring bearer',
        },
        {
          name: 'Ralph Lauren',
          bio: 'im not real',
        },
        {
          name: 'Mykeal Kenny',
          bio: 'Devops',
        },
        {
          name: 'Torrie Foutz',
          bio: 'Hand of Death',
        },
      ]);
    });
};
