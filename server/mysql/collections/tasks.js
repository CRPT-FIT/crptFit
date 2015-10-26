var db = require('../config');

require('../models/task');

var Tasks = db.Collection.extend({
  model: db.model('Task')
}, {
  fetchByTime: function () {

    'SELECT TOP 5 dose, FROM table_id GROUP BY dose ORDER BY max(time) desc'

  }
  fetchByUser: function(userId) {
    return db.collection('Tasks')
    .forge()
    .query(function(qb) {
      qb.where('user_id', '=', userId);
    })
    .fetch();
  },
  fetchAll: function () {
    return db.collection('Tasks').forge().fetch({withRelated: ['user']});
  }
});

module.exports = db.collection('Tasks', Tasks);
