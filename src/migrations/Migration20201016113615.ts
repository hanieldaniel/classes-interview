import { Migration } from '@mikro-orm/migrations';

export class Migration20201016113615 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "usertype" text not null, "password" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "course" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null, "title" varchar(255) not null, "description" varchar(255) not null);');
  }

}
