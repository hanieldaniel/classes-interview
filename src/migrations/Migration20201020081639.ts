import { Migration } from '@mikro-orm/migrations';

export class Migration20201020081639 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "course" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) not null, "createdby" int4 not null);');
  }

}
