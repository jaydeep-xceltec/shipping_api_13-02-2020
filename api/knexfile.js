
// constructions SQL using Javascript

// knex migrate:make create_user_table


// Created Migration: /home/ec2-user/environment/mysql/migrations/20180417161748_create_user_table.js

///fill in up and down method in migrations


// run migration  knex migrate:latest

// knex migrate:make encrypt_user_password
//Created Migration: /home/ec2-user/environment/mysql/migrations/20180417165034_encrypt_user_password.js

module.exports = {
  client: 'mysql',
  connection: {
    user: 'root',
    password: '',
     //database: 'cp',
     //host:'http://192.168.1.150'
    database: 'angular'
  }
 }

//  module.exports = {
//  client: 'mysql',
//   connection: {
//     user: 'root',
//     password: 'admin@123',
//     database: 'cp',
//     // port  : '3001',
//     // host: 'http://ec2-3-92-60-33.compute-1.amazonaws.com'
//     host: 'http://ec2-18-219-59-88.us-east-2.compute.amazonaws.com/'
//   }
// }

  // host: 'http://ec2-3-92-60-33.compute-1.amazonaws.com',
  //       port: '3333',
  //       user: 'root',
  //       password: 'event_naif',

  //       database: 'cp',
  //       charset: 'utf8',


