exports.up = function(knex, Promise) {
    return knex.schema.createTable('super_admin', function (t) {
    t.increments('id').primary()
    t.string('username').notNullable()
    t.string('password').notNullable()
    t.string('comapnyId').notNullable()
    t.string('mobileno').notNullable()
    t.string('email').notNullable()
})
};


//roll back
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('super_admin')
  };