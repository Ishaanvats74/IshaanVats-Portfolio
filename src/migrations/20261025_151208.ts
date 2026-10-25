import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_presentation_sections_key" AS ENUM('hero', 'chapters', 'profile', 'arsenal', 'work', 'journey', 'community', 'events', 'process', 'navigation', 'contact', 'projects-page', 'community-page', 'about-page', 'experience-page', 'activities-page', 'hackathons-page', 'events-page', 'resume-page', 'writing-page');
  CREATE TYPE "public"."enum_presentation_origin_cards_icon" AS ENUM('education', 'code', 'users');
  CREATE TABLE "presentation_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "enum_presentation_sections_key" NOT NULL,
  	"enabled" boolean DEFAULT true
  );
  
  CREATE TABLE "presentation_origin_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_presentation_origin_cards_icon" DEFAULT 'code'
  );
  
  CREATE TABLE "presentation_community_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "presentation_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "presentation_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "presentation_copy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "presentation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "skills" ALTER COLUMN "category" SET DATA TYPE varchar;
  ALTER TABLE "_skills_v" ALTER COLUMN "version_category" SET DATA TYPE varchar;
  ALTER TABLE "skills" ADD COLUMN "icon_light_id" integer;
  ALTER TABLE "skills" ADD COLUMN "icon_dark_id" integer;
  ALTER TABLE "_skills_v" ADD COLUMN "version_icon_light_id" integer;
  ALTER TABLE "_skills_v" ADD COLUMN "version_icon_dark_id" integer;
  ALTER TABLE "presentation_sections" ADD CONSTRAINT "presentation_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_origin_cards" ADD CONSTRAINT "presentation_origin_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_community_tags" ADD CONSTRAINT "presentation_community_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_process_steps" ADD CONSTRAINT "presentation_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_categories" ADD CONSTRAINT "presentation_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presentation_copy" ADD CONSTRAINT "presentation_copy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presentation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "presentation_sections_order_idx" ON "presentation_sections" USING btree ("_order");
  CREATE INDEX "presentation_sections_parent_id_idx" ON "presentation_sections" USING btree ("_parent_id");
  CREATE INDEX "presentation_origin_cards_order_idx" ON "presentation_origin_cards" USING btree ("_order");
  CREATE INDEX "presentation_origin_cards_parent_id_idx" ON "presentation_origin_cards" USING btree ("_parent_id");
  CREATE INDEX "presentation_community_tags_order_idx" ON "presentation_community_tags" USING btree ("_order");
  CREATE INDEX "presentation_community_tags_parent_id_idx" ON "presentation_community_tags" USING btree ("_parent_id");
  CREATE INDEX "presentation_process_steps_order_idx" ON "presentation_process_steps" USING btree ("_order");
  CREATE INDEX "presentation_process_steps_parent_id_idx" ON "presentation_process_steps" USING btree ("_parent_id");
  CREATE INDEX "presentation_categories_order_idx" ON "presentation_categories" USING btree ("_order");
  CREATE INDEX "presentation_categories_parent_id_idx" ON "presentation_categories" USING btree ("_parent_id");
  CREATE INDEX "presentation_copy_order_idx" ON "presentation_copy" USING btree ("_order");
  CREATE INDEX "presentation_copy_parent_id_idx" ON "presentation_copy" USING btree ("_parent_id");
  ALTER TABLE "skills" ADD CONSTRAINT "skills_icon_light_id_media_id_fk" FOREIGN KEY ("icon_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_icon_dark_id_media_id_fk" FOREIGN KEY ("icon_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_icon_light_id_media_id_fk" FOREIGN KEY ("version_icon_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_icon_dark_id_media_id_fk" FOREIGN KEY ("version_icon_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "skills_icon_light_idx" ON "skills" USING btree ("icon_light_id");
  CREATE INDEX "skills_icon_dark_idx" ON "skills" USING btree ("icon_dark_id");
  CREATE INDEX "_skills_v_version_version_icon_light_idx" ON "_skills_v" USING btree ("version_icon_light_id");
  CREATE INDEX "_skills_v_version_version_icon_dark_idx" ON "_skills_v" USING btree ("version_icon_dark_id");
  DROP TYPE "public"."enum_skills_category";
  DROP TYPE "public"."enum__skills_v_version_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_skills_category" AS ENUM('Languages', 'Frontend', 'Backend', 'AI', 'Databases', 'Infrastructure / Other');
  CREATE TYPE "public"."enum__skills_v_version_category" AS ENUM('Languages', 'Frontend', 'Backend', 'AI', 'Databases', 'Infrastructure / Other');
  ALTER TABLE "presentation_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presentation_origin_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presentation_community_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presentation_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presentation_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presentation_copy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presentation" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "presentation_sections" CASCADE;
  DROP TABLE "presentation_origin_cards" CASCADE;
  DROP TABLE "presentation_community_tags" CASCADE;
  DROP TABLE "presentation_process_steps" CASCADE;
  DROP TABLE "presentation_categories" CASCADE;
  DROP TABLE "presentation_copy" CASCADE;
  DROP TABLE "presentation" CASCADE;
  ALTER TABLE "skills" DROP CONSTRAINT "skills_icon_light_id_media_id_fk";
  
  ALTER TABLE "skills" DROP CONSTRAINT "skills_icon_dark_id_media_id_fk";
  
  ALTER TABLE "_skills_v" DROP CONSTRAINT "_skills_v_version_icon_light_id_media_id_fk";
  
  ALTER TABLE "_skills_v" DROP CONSTRAINT "_skills_v_version_icon_dark_id_media_id_fk";
  
  DROP INDEX "skills_icon_light_idx";
  DROP INDEX "skills_icon_dark_idx";
  DROP INDEX "_skills_v_version_version_icon_light_idx";
  DROP INDEX "_skills_v_version_version_icon_dark_idx";
  ALTER TABLE "skills" ALTER COLUMN "category" SET DATA TYPE "public"."enum_skills_category" USING "category"::"public"."enum_skills_category";
  ALTER TABLE "_skills_v" ALTER COLUMN "version_category" SET DATA TYPE "public"."enum__skills_v_version_category" USING "version_category"::"public"."enum__skills_v_version_category";
  ALTER TABLE "skills" DROP COLUMN "icon_light_id";
  ALTER TABLE "skills" DROP COLUMN "icon_dark_id";
  ALTER TABLE "_skills_v" DROP COLUMN "version_icon_light_id";
  ALTER TABLE "_skills_v" DROP COLUMN "version_icon_dark_id";
  DROP TYPE "public"."enum_presentation_sections_key";
  DROP TYPE "public"."enum_presentation_origin_cards_icon";`)
}
