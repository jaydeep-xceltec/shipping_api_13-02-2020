


// will automatically increment as well as updated_at and created_at fields using the t.timestamps method.

//creaet schema
// exports.up = function(knex, Promise) {
//     return knex.schema.createTable('users_management', function (t) {
//     t.increments('id').primary()
//     t.string('username').notNullable()
//     t.string('password').notNullable()
//     t.string('comapnyId').notNullable()
//     t.string('mobileno').notNullable()
//     t.string('email').notNullable()
// })
// };


// //roll back
// exports.down = function(knex, Promise) {
//     return knex.schema.dropTableIfExists('users_management')
//   };
