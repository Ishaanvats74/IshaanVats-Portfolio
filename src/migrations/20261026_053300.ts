import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_certificates_activity_type" AS ENUM('participated', 'organized');
  CREATE TYPE "public"."enum_certificates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certificates_v_version_activity_type" AS ENUM('participated', 'organized');
  CREATE TYPE "public"."enum__certificates_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_presentation_sections_key" ADD VALUE 'certificates';
  ALTER TYPE "public"."enum_presentation_sections_key" ADD VALUE 'certificates-page';
  ALTER TYPE "public"."enum_presentation_sections_key" ADD VALUE 'about-community';
  ALTER TYPE "public"."enum_presentation_sections_key" ADD VALUE 'about-experience';
  CREATE TABLE "certificates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"event_name" varchar,
  	"activity_type" "enum_certificates_activity_type",
  	"date" timestamp(3) with time zone,
  	"issuer_name" varchar,
  	"organization_id" integer,
  	"event_id" integer,
  	"description" varchar,
  	"preview_image_id" integer,
  	"certificate_file_id" integer,
  	"credential_u_r_l" varchar,
  	"display_order" numeric DEFAULT 0,
  	"visible" boolean DEFAULT true,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_certificates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_certificates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_event_name" varchar,
  	"version_activity_type" "enum__certificates_v_version_activity_type",
  	"version_date" timestamp(3) with time zone,
  	"version_issuer_name" varchar,
  	"version_organization_id" integer,
  	"version_event_id" integer,
  	"version_description" varchar,
  	"version_preview_image_id" integer,
  	"version_certificate_file_id" integer,
  	"version_credential_u_r_l" varchar,
  	"version_display_order" numeric DEFAULT 0,
  	"version_visible" boolean DEFAULT true,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__certificates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "certificates_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "community_enabled" boolean DEFAULT true;
  ALTER TABLE "site_settings" ADD COLUMN "community_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "community_role" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "community_organization_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "community_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "community_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "community_website" varchar;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_preview_image_id_media_id_fk" FOREIGN KEY ("preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_certificate_file_id_media_id_fk" FOREIGN KEY ("certificate_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certificates" ADD CONSTRAINT "certificates_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_parent_id_certificates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certificates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_organization_id_organizations_id_fk" FOREIGN KEY ("version_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_event_id_events_id_fk" FOREIGN KEY ("version_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_preview_image_id_media_id_fk" FOREIGN KEY ("version_preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_certificate_file_id_media_id_fk" FOREIGN KEY ("version_certificate_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certificates_v" ADD CONSTRAINT "_certificates_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "certificates_organization_idx" ON "certificates" USING btree ("organization_id");
  CREATE INDEX "certificates_event_idx" ON "certificates" USING btree ("event_id");
  CREATE INDEX "certificates_preview_image_idx" ON "certificates" USING btree ("preview_image_id");
  CREATE INDEX "certificates_certificate_file_idx" ON "certificates" USING btree ("certificate_file_id");
  CREATE INDEX "certificates_seo_seo_image_idx" ON "certificates" USING btree ("seo_image_id");
  CREATE INDEX "certificates_updated_at_idx" ON "certificates" USING btree ("updated_at");
  CREATE INDEX "certificates_created_at_idx" ON "certificates" USING btree ("created_at");
  CREATE INDEX "certificates__status_idx" ON "certificates" USING btree ("_status");
  CREATE INDEX "_certificates_v_parent_idx" ON "_certificates_v" USING btree ("parent_id");
  CREATE INDEX "_certificates_v_version_version_organization_idx" ON "_certificates_v" USING btree ("version_organization_id");
  CREATE INDEX "_certificates_v_version_version_event_idx" ON "_certificates_v" USING btree ("version_event_id");
  CREATE INDEX "_certificates_v_version_version_preview_image_idx" ON "_certificates_v" USING btree ("version_preview_image_id");
  CREATE INDEX "_certificates_v_version_version_certificate_file_idx" ON "_certificates_v" USING btree ("version_certificate_file_id");
  CREATE INDEX "_certificates_v_version_seo_version_seo_image_idx" ON "_certificates_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_certificates_v_version_version_updated_at_idx" ON "_certificates_v" USING btree ("version_updated_at");
  CREATE INDEX "_certificates_v_version_version_created_at_idx" ON "_certificates_v" USING btree ("version_created_at");
  CREATE INDEX "_certificates_v_version_version__status_idx" ON "_certificates_v" USING btree ("version__status");
  CREATE INDEX "_certificates_v_created_at_idx" ON "_certificates_v" USING btree ("created_at");
  CREATE INDEX "_certificates_v_updated_at_idx" ON "_certificates_v" USING btree ("updated_at");
  CREATE INDEX "_certificates_v_latest_idx" ON "_certificates_v" USING btree ("latest");
  CREATE INDEX "_certificates_v_autosave_idx" ON "_certificates_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certificates_fk" FOREIGN KEY ("certificates_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_community_organization_id_organizations_id_fk" FOREIGN KEY ("community_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_community_logo_id_media_id_fk" FOREIGN KEY ("community_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_certificates_id_idx" ON "payload_locked_documents_rels" USING btree ("certificates_id");
  CREATE INDEX "site_settings_community_community_organization_idx" ON "site_settings" USING btree ("community_organization_id");
  CREATE INDEX "site_settings_community_community_logo_idx" ON "site_settings" USING btree ("community_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "certificates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_certificates_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "certificates" CASCADE;
  DROP TABLE "_certificates_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_certificates_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_community_organization_id_organizations_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_community_logo_id_media_id_fk";
  
  ALTER TABLE "presentation_sections" ALTER COLUMN "key" SET DATA TYPE text;
  DROP TYPE "public"."enum_presentation_sections_key";
  CREATE TYPE "public"."enum_presentation_sections_key" AS ENUM('hero', 'chapters', 'profile', 'arsenal', 'work', 'journey', 'community', 'events', 'process', 'navigation', 'contact', 'projects-page', 'community-page', 'about-page', 'experience-page', 'activities-page', 'hackathons-page', 'events-page', 'resume-page', 'writing-page');
  ALTER TABLE "presentation_sections" ALTER COLUMN "key" SET DATA TYPE "public"."enum_presentation_sections_key" USING "key"::"public"."enum_presentation_sections_key";
  DROP INDEX "payload_locked_documents_rels_certificates_id_idx";
  DROP INDEX "site_settings_community_community_organization_idx";
  DROP INDEX "site_settings_community_community_logo_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "certificates_id";
  ALTER TABLE "site_settings" DROP COLUMN "community_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "community_name";
  ALTER TABLE "site_settings" DROP COLUMN "community_role";
  ALTER TABLE "site_settings" DROP COLUMN "community_organization_id";
  ALTER TABLE "site_settings" DROP COLUMN "community_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "community_description";
  ALTER TABLE "site_settings" DROP COLUMN "community_website";
  DROP TYPE "public"."enum_certificates_activity_type";
  DROP TYPE "public"."enum_certificates_status";
  DROP TYPE "public"."enum__certificates_v_version_activity_type";
  DROP TYPE "public"."enum__certificates_v_version_status";`)
}
