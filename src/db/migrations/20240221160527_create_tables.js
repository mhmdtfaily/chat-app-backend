/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  // Create user table
  await knex.schema.createTable('users', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('full_name');
    table.string('email');
    table.string('password');
    table.timestamps(true, true);
  });

  // Create chats table
  await knex.schema.createTable('chats', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user1_id').references('id').inTable('users').notNullable();
    table.uuid('user2_id').references('id').inTable('users').notNullable();
    table.timestamps(true, true);

    // Add a unique constraint to the combination of user1_id and user2_id
    table.unique(['user1_id', 'user2_id']);
  });

  // Create messages table
  await knex.schema.createTable('messages', table => {
    table.uuid('id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('sender_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('chat_id').unsigned().index().references('id').inTable('chats').onDelete('CASCADE');
    table.string('content');
    table.timestamp('sent_at').defaultTo(knex.fn.now());
    table.timestamp('delivered_at').nullable();
    table.timestamp('read_at').nullable();
    table.timestamps(true, true);
  });

  // Online Status Table (Optional)
  await knex.schema.createTable('online_status', function (table) {
    table.uuid('user_id').primary().references('id').inTable('users');
    table.timestamp('last_seen').defaultTo(knex.fn.now());
    table.boolean('is_online').defaultTo(false);
  })

  // Attachments Table (Optional)
  await knex.schema.createTable('attachments', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('message_id').references('id').inTable('messages').onDelete('CASCADE').notNullable();
    table.text('file_url').notNullable();
    table.string('file_type').notNullable();
    table.timestamps(true, true);
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('attachments')
  await knex.schema.dropTableIfExists('online_status')
  await knex.schema.dropTableIfExists('messages');
  await knex.schema.dropTableIfExists('chats');
  await knex.schema.dropTableIfExists('user');
};


