exports.up = function(knex, Promise) {
    return knex.schema.createTable('draw_charter_management', function (t) {
    t.increments('id').primary()
    t.string('CPTypeId').notNullable()
    t.string('formId').notNullable()
    t.string('vesselId').notNullable()
    t.string('ownerId').notNullable()
    t.string('chartererId').notNullable()
    t.string('chartererBrokerId').notNullable()
    t.string('ownerBrokerId').notNullable()
    t.string('cpDate').notNullable()
    t.string('cpTime').notNullable()
    t.string('cpCity').notNullable()
    t.string('createdBy').notNullable()
    t.string('createdAt').notNullable()
    t.string('updatedBy').notNullable()
    t.string('updatedAt').notNullable()
    t.string('isActive').notNullable()
    t.string('isDelete').notNullable()
 
})
};


//roll back
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('draw_charter_management')
  };