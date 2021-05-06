'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`CREATE TABLE IF NOT EXISTS cakes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    comment VARCHAR(512) NOT NULL,
    imageUrl VARCHAR(256) NOT NULL,
    yumFactor TINYINT NOT NULL,

    CONSTRAINT unique_name UNIQUE (name)
  )`);
};

exports.down = function(db) {
  return db.dropTable('cakes');
};

exports._meta = {
  "version": 1
};
