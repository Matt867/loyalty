const Stamp = require('./Stamp');
const BusinessAccount = require('./BusinessAccount');
const ConsumerAccount = require('./ConsumerAccount');

Stamp.belongsTo(ConsumerAccount);
ConsumerAccount.hasMany(Stamp);

Stamp.belongsTo(BusinessAccount);
BusinessAccount.hasMany(Stamp);

module.exports = { Stamp, BusinessAccount, ConsumerAccount }
