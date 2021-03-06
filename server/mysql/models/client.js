var db = require('../config.js');

require('./user');

var Client = db.Model.extend({
  tableName: 'clients',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User');
  },
}, {
  newClient: function (options) {
    return new this(options);
  },
  fetchById: function (id) {
    return new this({
      id: id
    }).fetch({withRelated: ['user']});
  }
});

module.exports = db.model('Client', Client);
