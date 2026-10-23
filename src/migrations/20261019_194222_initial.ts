import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_category" AS ENUM('Engineering', 'AI', 'Developer tools');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('Engineering', 'AI', 'Developer tools');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_category" AS ENUM('Hackathon', 'Workshop', 'Meetup', 'Conference', 'Other');
  CREATE TYPE "public"."enum_events_role" AS ENUM('Organizer', 'Co-organizer', 'Attendee', 'Volunteer', 'Partner', 'Speaker', 'Support');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_category" AS ENUM('Hackathon', 'Workshop', 'Meetup', 'Conference', 'Other');
  CREATE TYPE "public"."enum__events_v_version_role" AS ENUM('Organizer', 'Co-organizer', 'Attendee', 'Volunteer', 'Partner', 'Speaker', 'Support');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_hackathons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hackathons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_experience_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__experience_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contributions_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contributions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_organizations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__organizations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_skills_category" AS ENUM('Languages', 'Frontend', 'Backend', 'AI', 'Databases', 'Infrastructure / Other');
  CREATE TYPE "public"."enum_skills_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__skills_v_version_category" AS ENUM('Languages', 'Frontend', 'Backend', 'AI', 'Databases', 'Infrastructure / Other');
  CREATE TYPE "public"."enum__skills_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_media_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__media_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_resume_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__resume_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"tagline" varchar,
  	"description" varchar,
  	"category" "enum_projects_category",
  	"cover_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric DEFAULT 0,
  	"github_u_r_l" varchar,
  	"live_u_r_l" varchar,
  	"status" "enum_projects_status",
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"case_study_overview" jsonb,
  	"case_study_problem" jsonb,
  	"case_study_solution" jsonb,
  	"case_study_role" varchar,
  	"case_study_features" jsonb,
  	"case_study_architecture" jsonb,
  	"case_study_challenges" jsonb,
  	"case_study_outcomes" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"hackathons_id" integer
  );
  
  CREATE TABLE "_projects_v_version_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_tagline" varchar,
  	"version_description" varchar,
  	"version_category" "enum__projects_v_version_category",
  	"version_cover_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_display_order" numeric DEFAULT 0,
  	"version_github_u_r_l" varchar,
  	"version_live_u_r_l" varchar,
  	"version_status" "enum__projects_v_version_status",
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_case_study_overview" jsonb,
  	"version_case_study_problem" jsonb,
  	"version_case_study_solution" jsonb,
  	"version_case_study_role" varchar,
  	"version_case_study_features" jsonb,
  	"version_case_study_architecture" jsonb,
  	"version_case_study_challenges" jsonb,
  	"version_case_study_outcomes" jsonb,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"hackathons_id" integer
  );
  
  CREATE TABLE "events_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "events_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_events_category",
  	"organization_id" integer,
  	"role" "enum_events_role",
  	"description" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"cover_image_id" integer,
  	"poster_id" integer,
  	"event_u_r_l" varchar,
  	"featured" boolean DEFAULT false,
  	"display_order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_events_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_version_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__events_v_version_category",
  	"version_organization_id" integer,
  	"version_role" "enum__events_v_version_role",
  	"version_description" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_cover_image_id" integer,
  	"version_poster_id" integer,
  	"version_event_u_r_l" varchar,
  	"version_featured" boolean DEFAULT false,
  	"version_display_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "hackathons_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "hackathons_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "hackathons_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "hackathons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"organizer_id" integer,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar,
  	"cover_image_id" integer,
  	"role" varchar,
  	"track" varchar,
  	"verified_achievement" varchar,
  	"event_u_r_l" varchar,
  	"github_u_r_l" varchar,
  	"live_u_r_l" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_hackathons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "hackathons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "_hackathons_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hackathons_v_version_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hackathons_v_version_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hackathons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_organizer_id" integer,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_location" varchar,
  	"version_cover_image_id" integer,
  	"version_role" varchar,
  	"version_track" varchar,
  	"version_verified_achievement" varchar,
  	"version_event_u_r_l" varchar,
  	"version_github_u_r_l" varchar,
  	"version_live_u_r_l" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__hackathons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_hackathons_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer
  );
  
  CREATE TABLE "experience_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "experience_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"organization_id" integer,
  	"role" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_experience_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "experience_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "_experience_v_version_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experience_v_version_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_experience_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_organization_id" integer,
  	"version_role" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_description" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__experience_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_experience_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "contributions_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "contributions_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "contributions_verified_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"source_u_r_l" varchar
  );
  
  CREATE TABLE "contributions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"organization_id" integer,
  	"role" varchar,
  	"description" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_contributions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "contributions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "_contributions_v_version_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contributions_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contributions_v_version_verified_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"source_u_r_l" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contributions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_organization_id" integer,
  	"version_role" varchar,
  	"version_description" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__contributions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_contributions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"logo_id" integer,
  	"description" varchar,
  	"website" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_organizations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "organizations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"contributions_id" integer
  );
  
  CREATE TABLE "_organizations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_logo_id" integer,
  	"version_description" varchar,
  	"version_website" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__organizations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_organizations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"events_id" integer,
  	"contributions_id" integer
  );
  
  CREATE TABLE "articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_articles_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" "enum_skills_category",
  	"icon_id" integer,
  	"website" varchar,
  	"display_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_skills_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_skills_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_category" "enum__skills_v_version_category",
  	"version_icon_id" integer,
  	"version_website" varchar,
  	"version_display_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__skills_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"attribution" varchar,
  	"attribution_u_r_l" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_media_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "_media_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_alt" varchar,
  	"version_caption" varchar,
  	"version_attribution" varchar,
  	"version_attribution_u_r_l" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__media_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"version_sizes_card_url" varchar,
  	"version_sizes_card_width" numeric,
  	"version_sizes_card_height" numeric,
  	"version_sizes_card_mime_type" varchar,
  	"version_sizes_card_filesize" numeric,
  	"version_sizes_card_filename" varchar,
  	"version_sizes_thumbnail_url" varchar,
  	"version_sizes_thumbnail_width" numeric,
  	"version_sizes_thumbnail_height" numeric,
  	"version_sizes_thumbnail_mime_type" varchar,
  	"version_sizes_thumbnail_filesize" numeric,
  	"version_sizes_thumbnail_filename" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "resume" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"pdf_id" integer,
  	"last_updated" timestamp(3) with time zone,
  	"preview_image_id" integer,
  	"visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_resume_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_resume_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_pdf_id" integer,
  	"version_last_updated" timestamp(3) with time zone,
  	"version_preview_image_id" integer,
  	"version_visible" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__resume_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"projects_id" integer,
  	"events_id" integer,
  	"hackathons_id" integer,
  	"experience_id" integer,
  	"contributions_id" integer,
  	"organizations_id" integer,
  	"articles_id" integer,
  	"skills_id" integer,
  	"media_id" integer,
  	"resume_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_homepage_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"headline" varchar,
  	"biography" varchar,
  	"education" varchar,
  	"location" varchar,
  	"portrait_id" integer,
  	"email" varchar,
  	"phone" varchar,
  	"footer" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"homepage_eyebrow" varchar,
  	"homepage_intro" varchar,
  	"homepage_community_intro" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_technologies" ADD CONSTRAINT "projects_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_hackathons_fk" FOREIGN KEY ("hackathons_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_technologies" ADD CONSTRAINT "_projects_v_version_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_hackathons_fk" FOREIGN KEY ("hackathons_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_gallery" ADD CONSTRAINT "events_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_gallery" ADD CONSTRAINT "events_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_responsibilities" ADD CONSTRAINT "events_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_gallery" ADD CONSTRAINT "_events_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_version_gallery" ADD CONSTRAINT "_events_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_responsibilities" ADD CONSTRAINT "_events_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_organization_id_organizations_id_fk" FOREIGN KEY ("version_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_poster_id_media_id_fk" FOREIGN KEY ("version_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_gallery" ADD CONSTRAINT "hackathons_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons_gallery" ADD CONSTRAINT "hackathons_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_team" ADD CONSTRAINT "hackathons_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_technologies" ADD CONSTRAINT "hackathons_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_organizer_id_organizations_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons" ADD CONSTRAINT "hackathons_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hackathons_rels" ADD CONSTRAINT "hackathons_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_gallery" ADD CONSTRAINT "_hackathons_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_gallery" ADD CONSTRAINT "_hackathons_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_team" ADD CONSTRAINT "_hackathons_v_version_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_version_technologies" ADD CONSTRAINT "_hackathons_v_version_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_parent_id_hackathons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hackathons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_organizer_id_organizations_id_fk" FOREIGN KEY ("version_organizer_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v" ADD CONSTRAINT "_hackathons_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hackathons_v_rels" ADD CONSTRAINT "_hackathons_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hackathons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hackathons_v_rels" ADD CONSTRAINT "_hackathons_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_responsibilities" ADD CONSTRAINT "experience_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_achievements" ADD CONSTRAINT "experience_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience" ADD CONSTRAINT "experience_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experience" ADD CONSTRAINT "experience_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_rels" ADD CONSTRAINT "experience_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_version_responsibilities" ADD CONSTRAINT "_experience_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_version_achievements" ADD CONSTRAINT "_experience_v_version_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v" ADD CONSTRAINT "_experience_v_parent_id_experience_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experience_v" ADD CONSTRAINT "_experience_v_version_organization_id_organizations_id_fk" FOREIGN KEY ("version_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experience_v" ADD CONSTRAINT "_experience_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_experience_v_rels" ADD CONSTRAINT "_experience_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_experience_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_rels" ADD CONSTRAINT "_experience_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_experience_v_rels" ADD CONSTRAINT "_experience_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributions_responsibilities" ADD CONSTRAINT "contributions_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributions_gallery" ADD CONSTRAINT "contributions_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contributions_gallery" ADD CONSTRAINT "contributions_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributions_verified_metrics" ADD CONSTRAINT "contributions_verified_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributions" ADD CONSTRAINT "contributions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contributions_rels" ADD CONSTRAINT "contributions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributions_rels" ADD CONSTRAINT "contributions_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributions_rels" ADD CONSTRAINT "contributions_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_version_responsibilities" ADD CONSTRAINT "_contributions_v_version_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contributions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_version_gallery" ADD CONSTRAINT "_contributions_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contributions_v_version_gallery" ADD CONSTRAINT "_contributions_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contributions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_version_verified_metrics" ADD CONSTRAINT "_contributions_v_version_verified_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contributions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v" ADD CONSTRAINT "_contributions_v_parent_id_contributions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contributions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contributions_v" ADD CONSTRAINT "_contributions_v_version_organization_id_organizations_id_fk" FOREIGN KEY ("version_organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contributions_v_rels" ADD CONSTRAINT "_contributions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_contributions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_rels" ADD CONSTRAINT "_contributions_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contributions_v_rels" ADD CONSTRAINT "_contributions_v_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_contributions_fk" FOREIGN KEY ("contributions_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_organizations_v" ADD CONSTRAINT "_organizations_v_parent_id_organizations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_organizations_v" ADD CONSTRAINT "_organizations_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_organizations_v_rels" ADD CONSTRAINT "_organizations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_organizations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_organizations_v_rels" ADD CONSTRAINT "_organizations_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_organizations_v_rels" ADD CONSTRAINT "_organizations_v_rels_contributions_fk" FOREIGN KEY ("contributions_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_version_tags" ADD CONSTRAINT "_articles_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills" ADD CONSTRAINT "skills_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_parent_id_skills_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_skills_v" ADD CONSTRAINT "_skills_v_version_icon_id_media_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_media_v" ADD CONSTRAINT "_media_v_parent_id_media_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume" ADD CONSTRAINT "resume_pdf_id_media_id_fk" FOREIGN KEY ("pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "resume" ADD CONSTRAINT "resume_preview_image_id_media_id_fk" FOREIGN KEY ("preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resume_v" ADD CONSTRAINT "_resume_v_parent_id_resume_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resume"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resume_v" ADD CONSTRAINT "_resume_v_version_pdf_id_media_id_fk" FOREIGN KEY ("version_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_resume_v" ADD CONSTRAINT "_resume_v_version_preview_image_id_media_id_fk" FOREIGN KEY ("version_preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hackathons_fk" FOREIGN KEY ("hackathons_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contributions_fk" FOREIGN KEY ("contributions_id") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resume_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_navigation" ADD CONSTRAINT "site_settings_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_homepage_pillars" ADD CONSTRAINT "site_settings_homepage_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "projects_technologies_order_idx" ON "projects_technologies" USING btree ("_order");
  CREATE INDEX "projects_technologies_parent_id_idx" ON "projects_technologies" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_events_id_idx" ON "projects_rels" USING btree ("events_id");
  CREATE INDEX "projects_rels_hackathons_id_idx" ON "projects_rels" USING btree ("hackathons_id");
  CREATE INDEX "_projects_v_version_technologies_order_idx" ON "_projects_v_version_technologies" USING btree ("_order");
  CREATE INDEX "_projects_v_version_technologies_parent_id_idx" ON "_projects_v_version_technologies" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_cover_image_idx" ON "_projects_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_events_id_idx" ON "_projects_v_rels" USING btree ("events_id");
  CREATE INDEX "_projects_v_rels_hackathons_id_idx" ON "_projects_v_rels" USING btree ("hackathons_id");
  CREATE INDEX "events_gallery_order_idx" ON "events_gallery" USING btree ("_order");
  CREATE INDEX "events_gallery_parent_id_idx" ON "events_gallery" USING btree ("_parent_id");
  CREATE INDEX "events_gallery_image_idx" ON "events_gallery" USING btree ("image_id");
  CREATE INDEX "events_responsibilities_order_idx" ON "events_responsibilities" USING btree ("_order");
  CREATE INDEX "events_responsibilities_parent_id_idx" ON "events_responsibilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_organization_idx" ON "events" USING btree ("organization_id");
  CREATE INDEX "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
  CREATE INDEX "events_poster_idx" ON "events" USING btree ("poster_id");
  CREATE INDEX "events_seo_seo_image_idx" ON "events" USING btree ("seo_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_projects_id_idx" ON "events_rels" USING btree ("projects_id");
  CREATE INDEX "_events_v_version_gallery_order_idx" ON "_events_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_events_v_version_gallery_parent_id_idx" ON "_events_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_events_v_version_gallery_image_idx" ON "_events_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_events_v_version_responsibilities_order_idx" ON "_events_v_version_responsibilities" USING btree ("_order");
  CREATE INDEX "_events_v_version_responsibilities_parent_id_idx" ON "_events_v_version_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_organization_idx" ON "_events_v" USING btree ("version_organization_id");
  CREATE INDEX "_events_v_version_version_cover_image_idx" ON "_events_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_events_v_version_version_poster_idx" ON "_events_v" USING btree ("version_poster_id");
  CREATE INDEX "_events_v_version_seo_version_seo_image_idx" ON "_events_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_projects_id_idx" ON "_events_v_rels" USING btree ("projects_id");
  CREATE INDEX "hackathons_gallery_order_idx" ON "hackathons_gallery" USING btree ("_order");
  CREATE INDEX "hackathons_gallery_parent_id_idx" ON "hackathons_gallery" USING btree ("_parent_id");
  CREATE INDEX "hackathons_gallery_image_idx" ON "hackathons_gallery" USING btree ("image_id");
  CREATE INDEX "hackathons_team_order_idx" ON "hackathons_team" USING btree ("_order");
  CREATE INDEX "hackathons_team_parent_id_idx" ON "hackathons_team" USING btree ("_parent_id");
  CREATE INDEX "hackathons_technologies_order_idx" ON "hackathons_technologies" USING btree ("_order");
  CREATE INDEX "hackathons_technologies_parent_id_idx" ON "hackathons_technologies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "hackathons_slug_idx" ON "hackathons" USING btree ("slug");
  CREATE INDEX "hackathons_organizer_idx" ON "hackathons" USING btree ("organizer_id");
  CREATE INDEX "hackathons_cover_image_idx" ON "hackathons" USING btree ("cover_image_id");
  CREATE INDEX "hackathons_seo_seo_image_idx" ON "hackathons" USING btree ("seo_image_id");
  CREATE INDEX "hackathons_updated_at_idx" ON "hackathons" USING btree ("updated_at");
  CREATE INDEX "hackathons_created_at_idx" ON "hackathons" USING btree ("created_at");
  CREATE INDEX "hackathons__status_idx" ON "hackathons" USING btree ("_status");
  CREATE INDEX "hackathons_rels_order_idx" ON "hackathons_rels" USING btree ("order");
  CREATE INDEX "hackathons_rels_parent_idx" ON "hackathons_rels" USING btree ("parent_id");
  CREATE INDEX "hackathons_rels_path_idx" ON "hackathons_rels" USING btree ("path");
  CREATE INDEX "hackathons_rels_projects_id_idx" ON "hackathons_rels" USING btree ("projects_id");
  CREATE INDEX "_hackathons_v_version_gallery_order_idx" ON "_hackathons_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_hackathons_v_version_gallery_parent_id_idx" ON "_hackathons_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_hackathons_v_version_gallery_image_idx" ON "_hackathons_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_hackathons_v_version_team_order_idx" ON "_hackathons_v_version_team" USING btree ("_order");
  CREATE INDEX "_hackathons_v_version_team_parent_id_idx" ON "_hackathons_v_version_team" USING btree ("_parent_id");
  CREATE INDEX "_hackathons_v_version_technologies_order_idx" ON "_hackathons_v_version_technologies" USING btree ("_order");
  CREATE INDEX "_hackathons_v_version_technologies_parent_id_idx" ON "_hackathons_v_version_technologies" USING btree ("_parent_id");
  CREATE INDEX "_hackathons_v_parent_idx" ON "_hackathons_v" USING btree ("parent_id");
  CREATE INDEX "_hackathons_v_version_version_slug_idx" ON "_hackathons_v" USING btree ("version_slug");
  CREATE INDEX "_hackathons_v_version_version_organizer_idx" ON "_hackathons_v" USING btree ("version_organizer_id");
  CREATE INDEX "_hackathons_v_version_version_cover_image_idx" ON "_hackathons_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_hackathons_v_version_seo_version_seo_image_idx" ON "_hackathons_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_hackathons_v_version_version_updated_at_idx" ON "_hackathons_v" USING btree ("version_updated_at");
  CREATE INDEX "_hackathons_v_version_version_created_at_idx" ON "_hackathons_v" USING btree ("version_created_at");
  CREATE INDEX "_hackathons_v_version_version__status_idx" ON "_hackathons_v" USING btree ("version__status");
  CREATE INDEX "_hackathons_v_created_at_idx" ON "_hackathons_v" USING btree ("created_at");
  CREATE INDEX "_hackathons_v_updated_at_idx" ON "_hackathons_v" USING btree ("updated_at");
  CREATE INDEX "_hackathons_v_latest_idx" ON "_hackathons_v" USING btree ("latest");
  CREATE INDEX "_hackathons_v_autosave_idx" ON "_hackathons_v" USING btree ("autosave");
  CREATE INDEX "_hackathons_v_rels_order_idx" ON "_hackathons_v_rels" USING btree ("order");
  CREATE INDEX "_hackathons_v_rels_parent_idx" ON "_hackathons_v_rels" USING btree ("parent_id");
  CREATE INDEX "_hackathons_v_rels_path_idx" ON "_hackathons_v_rels" USING btree ("path");
  CREATE INDEX "_hackathons_v_rels_projects_id_idx" ON "_hackathons_v_rels" USING btree ("projects_id");
  CREATE INDEX "experience_responsibilities_order_idx" ON "experience_responsibilities" USING btree ("_order");
  CREATE INDEX "experience_responsibilities_parent_id_idx" ON "experience_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "experience_achievements_order_idx" ON "experience_achievements" USING btree ("_order");
  CREATE INDEX "experience_achievements_parent_id_idx" ON "experience_achievements" USING btree ("_parent_id");
  CREATE INDEX "experience_organization_idx" ON "experience" USING btree ("organization_id");
  CREATE INDEX "experience_logo_idx" ON "experience" USING btree ("logo_id");
  CREATE INDEX "experience_updated_at_idx" ON "experience" USING btree ("updated_at");
  CREATE INDEX "experience_created_at_idx" ON "experience" USING btree ("created_at");
  CREATE INDEX "experience__status_idx" ON "experience" USING btree ("_status");
  CREATE INDEX "experience_rels_order_idx" ON "experience_rels" USING btree ("order");
  CREATE INDEX "experience_rels_parent_idx" ON "experience_rels" USING btree ("parent_id");
  CREATE INDEX "experience_rels_path_idx" ON "experience_rels" USING btree ("path");
  CREATE INDEX "experience_rels_projects_id_idx" ON "experience_rels" USING btree ("projects_id");
  CREATE INDEX "experience_rels_events_id_idx" ON "experience_rels" USING btree ("events_id");
  CREATE INDEX "_experience_v_version_responsibilities_order_idx" ON "_experience_v_version_responsibilities" USING btree ("_order");
  CREATE INDEX "_experience_v_version_responsibilities_parent_id_idx" ON "_experience_v_version_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_experience_v_version_achievements_order_idx" ON "_experience_v_version_achievements" USING btree ("_order");
  CREATE INDEX "_experience_v_version_achievements_parent_id_idx" ON "_experience_v_version_achievements" USING btree ("_parent_id");
  CREATE INDEX "_experience_v_parent_idx" ON "_experience_v" USING btree ("parent_id");
  CREATE INDEX "_experience_v_version_version_organization_idx" ON "_experience_v" USING btree ("version_organization_id");
  CREATE INDEX "_experience_v_version_version_logo_idx" ON "_experience_v" USING btree ("version_logo_id");
  CREATE INDEX "_experience_v_version_version_updated_at_idx" ON "_experience_v" USING btree ("version_updated_at");
  CREATE INDEX "_experience_v_version_version_created_at_idx" ON "_experience_v" USING btree ("version_created_at");
  CREATE INDEX "_experience_v_version_version__status_idx" ON "_experience_v" USING btree ("version__status");
  CREATE INDEX "_experience_v_created_at_idx" ON "_experience_v" USING btree ("created_at");
  CREATE INDEX "_experience_v_updated_at_idx" ON "_experience_v" USING btree ("updated_at");
  CREATE INDEX "_experience_v_latest_idx" ON "_experience_v" USING btree ("latest");
  CREATE INDEX "_experience_v_autosave_idx" ON "_experience_v" USING btree ("autosave");
  CREATE INDEX "_experience_v_rels_order_idx" ON "_experience_v_rels" USING btree ("order");
  CREATE INDEX "_experience_v_rels_parent_idx" ON "_experience_v_rels" USING btree ("parent_id");
  CREATE INDEX "_experience_v_rels_path_idx" ON "_experience_v_rels" USING btree ("path");
  CREATE INDEX "_experience_v_rels_projects_id_idx" ON "_experience_v_rels" USING btree ("projects_id");
  CREATE INDEX "_experience_v_rels_events_id_idx" ON "_experience_v_rels" USING btree ("events_id");
  CREATE INDEX "contributions_responsibilities_order_idx" ON "contributions_responsibilities" USING btree ("_order");
  CREATE INDEX "contributions_responsibilities_parent_id_idx" ON "contributions_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "contributions_gallery_order_idx" ON "contributions_gallery" USING btree ("_order");
  CREATE INDEX "contributions_gallery_parent_id_idx" ON "contributions_gallery" USING btree ("_parent_id");
  CREATE INDEX "contributions_gallery_image_idx" ON "contributions_gallery" USING btree ("image_id");
  CREATE INDEX "contributions_verified_metrics_order_idx" ON "contributions_verified_metrics" USING btree ("_order");
  CREATE INDEX "contributions_verified_metrics_parent_id_idx" ON "contributions_verified_metrics" USING btree ("_parent_id");
  CREATE INDEX "contributions_organization_idx" ON "contributions" USING btree ("organization_id");
  CREATE INDEX "contributions_updated_at_idx" ON "contributions" USING btree ("updated_at");
  CREATE INDEX "contributions_created_at_idx" ON "contributions" USING btree ("created_at");
  CREATE INDEX "contributions__status_idx" ON "contributions" USING btree ("_status");
  CREATE INDEX "contributions_rels_order_idx" ON "contributions_rels" USING btree ("order");
  CREATE INDEX "contributions_rels_parent_idx" ON "contributions_rels" USING btree ("parent_id");
  CREATE INDEX "contributions_rels_path_idx" ON "contributions_rels" USING btree ("path");
  CREATE INDEX "contributions_rels_events_id_idx" ON "contributions_rels" USING btree ("events_id");
  CREATE INDEX "contributions_rels_projects_id_idx" ON "contributions_rels" USING btree ("projects_id");
  CREATE INDEX "_contributions_v_version_responsibilities_order_idx" ON "_contributions_v_version_responsibilities" USING btree ("_order");
  CREATE INDEX "_contributions_v_version_responsibilities_parent_id_idx" ON "_contributions_v_version_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_contributions_v_version_gallery_order_idx" ON "_contributions_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_contributions_v_version_gallery_parent_id_idx" ON "_contributions_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_contributions_v_version_gallery_image_idx" ON "_contributions_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_contributions_v_version_verified_metrics_order_idx" ON "_contributions_v_version_verified_metrics" USING btree ("_order");
  CREATE INDEX "_contributions_v_version_verified_metrics_parent_id_idx" ON "_contributions_v_version_verified_metrics" USING btree ("_parent_id");
  CREATE INDEX "_contributions_v_parent_idx" ON "_contributions_v" USING btree ("parent_id");
  CREATE INDEX "_contributions_v_version_version_organization_idx" ON "_contributions_v" USING btree ("version_organization_id");
  CREATE INDEX "_contributions_v_version_version_updated_at_idx" ON "_contributions_v" USING btree ("version_updated_at");
  CREATE INDEX "_contributions_v_version_version_created_at_idx" ON "_contributions_v" USING btree ("version_created_at");
  CREATE INDEX "_contributions_v_version_version__status_idx" ON "_contributions_v" USING btree ("version__status");
  CREATE INDEX "_contributions_v_created_at_idx" ON "_contributions_v" USING btree ("created_at");
  CREATE INDEX "_contributions_v_updated_at_idx" ON "_contributions_v" USING btree ("updated_at");
  CREATE INDEX "_contributions_v_latest_idx" ON "_contributions_v" USING btree ("latest");
  CREATE INDEX "_contributions_v_autosave_idx" ON "_contributions_v" USING btree ("autosave");
  CREATE INDEX "_contributions_v_rels_order_idx" ON "_contributions_v_rels" USING btree ("order");
  CREATE INDEX "_contributions_v_rels_parent_idx" ON "_contributions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_contributions_v_rels_path_idx" ON "_contributions_v_rels" USING btree ("path");
  CREATE INDEX "_contributions_v_rels_events_id_idx" ON "_contributions_v_rels" USING btree ("events_id");
  CREATE INDEX "_contributions_v_rels_projects_id_idx" ON "_contributions_v_rels" USING btree ("projects_id");
  CREATE INDEX "organizations_logo_idx" ON "organizations" USING btree ("logo_id");
  CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");
  CREATE INDEX "organizations_created_at_idx" ON "organizations" USING btree ("created_at");
  CREATE INDEX "organizations__status_idx" ON "organizations" USING btree ("_status");
  CREATE INDEX "organizations_rels_order_idx" ON "organizations_rels" USING btree ("order");
  CREATE INDEX "organizations_rels_parent_idx" ON "organizations_rels" USING btree ("parent_id");
  CREATE INDEX "organizations_rels_path_idx" ON "organizations_rels" USING btree ("path");
  CREATE INDEX "organizations_rels_events_id_idx" ON "organizations_rels" USING btree ("events_id");
  CREATE INDEX "organizations_rels_contributions_id_idx" ON "organizations_rels" USING btree ("contributions_id");
  CREATE INDEX "_organizations_v_parent_idx" ON "_organizations_v" USING btree ("parent_id");
  CREATE INDEX "_organizations_v_version_version_logo_idx" ON "_organizations_v" USING btree ("version_logo_id");
  CREATE INDEX "_organizations_v_version_version_updated_at_idx" ON "_organizations_v" USING btree ("version_updated_at");
  CREATE INDEX "_organizations_v_version_version_created_at_idx" ON "_organizations_v" USING btree ("version_created_at");
  CREATE INDEX "_organizations_v_version_version__status_idx" ON "_organizations_v" USING btree ("version__status");
  CREATE INDEX "_organizations_v_created_at_idx" ON "_organizations_v" USING btree ("created_at");
  CREATE INDEX "_organizations_v_updated_at_idx" ON "_organizations_v" USING btree ("updated_at");
  CREATE INDEX "_organizations_v_latest_idx" ON "_organizations_v" USING btree ("latest");
  CREATE INDEX "_organizations_v_autosave_idx" ON "_organizations_v" USING btree ("autosave");
  CREATE INDEX "_organizations_v_rels_order_idx" ON "_organizations_v_rels" USING btree ("order");
  CREATE INDEX "_organizations_v_rels_parent_idx" ON "_organizations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_organizations_v_rels_path_idx" ON "_organizations_v_rels" USING btree ("path");
  CREATE INDEX "_organizations_v_rels_events_id_idx" ON "_organizations_v_rels" USING btree ("events_id");
  CREATE INDEX "_organizations_v_rels_contributions_id_idx" ON "_organizations_v_rels" USING btree ("contributions_id");
  CREATE INDEX "articles_tags_order_idx" ON "articles_tags" USING btree ("_order");
  CREATE INDEX "articles_tags_parent_id_idx" ON "articles_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX "articles_seo_seo_image_idx" ON "articles" USING btree ("seo_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "_articles_v_version_tags_order_idx" ON "_articles_v_version_tags" USING btree ("_order");
  CREATE INDEX "_articles_v_version_tags_parent_id_idx" ON "_articles_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_cover_image_idx" ON "_articles_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_articles_v_version_seo_version_seo_image_idx" ON "_articles_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "skills_icon_idx" ON "skills" USING btree ("icon_id");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "skills__status_idx" ON "skills" USING btree ("_status");
  CREATE INDEX "_skills_v_parent_idx" ON "_skills_v" USING btree ("parent_id");
  CREATE INDEX "_skills_v_version_version_icon_idx" ON "_skills_v" USING btree ("version_icon_id");
  CREATE INDEX "_skills_v_version_version_updated_at_idx" ON "_skills_v" USING btree ("version_updated_at");
  CREATE INDEX "_skills_v_version_version_created_at_idx" ON "_skills_v" USING btree ("version_created_at");
  CREATE INDEX "_skills_v_version_version__status_idx" ON "_skills_v" USING btree ("version__status");
  CREATE INDEX "_skills_v_created_at_idx" ON "_skills_v" USING btree ("created_at");
  CREATE INDEX "_skills_v_updated_at_idx" ON "_skills_v" USING btree ("updated_at");
  CREATE INDEX "_skills_v_latest_idx" ON "_skills_v" USING btree ("latest");
  CREATE INDEX "_skills_v_autosave_idx" ON "_skills_v" USING btree ("autosave");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media__status_idx" ON "media" USING btree ("_status");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "_media_v_parent_idx" ON "_media_v" USING btree ("parent_id");
  CREATE INDEX "_media_v_version_version_updated_at_idx" ON "_media_v" USING btree ("version_updated_at");
  CREATE INDEX "_media_v_version_version_created_at_idx" ON "_media_v" USING btree ("version_created_at");
  CREATE INDEX "_media_v_version_version__status_idx" ON "_media_v" USING btree ("version__status");
  CREATE INDEX "_media_v_version_version_filename_idx" ON "_media_v" USING btree ("version_filename");
  CREATE INDEX "_media_v_version_sizes_card_version_sizes_card_filename_idx" ON "_media_v" USING btree ("version_sizes_card_filename");
  CREATE INDEX "_media_v_version_sizes_thumbnail_version_sizes_thumbnail_idx" ON "_media_v" USING btree ("version_sizes_thumbnail_filename");
  CREATE INDEX "_media_v_created_at_idx" ON "_media_v" USING btree ("created_at");
  CREATE INDEX "_media_v_updated_at_idx" ON "_media_v" USING btree ("updated_at");
  CREATE INDEX "_media_v_latest_idx" ON "_media_v" USING btree ("latest");
  CREATE INDEX "resume_pdf_idx" ON "resume" USING btree ("pdf_id");
  CREATE INDEX "resume_preview_image_idx" ON "resume" USING btree ("preview_image_id");
  CREATE INDEX "resume_updated_at_idx" ON "resume" USING btree ("updated_at");
  CREATE INDEX "resume_created_at_idx" ON "resume" USING btree ("created_at");
  CREATE INDEX "resume__status_idx" ON "resume" USING btree ("_status");
  CREATE INDEX "_resume_v_parent_idx" ON "_resume_v" USING btree ("parent_id");
  CREATE INDEX "_resume_v_version_version_pdf_idx" ON "_resume_v" USING btree ("version_pdf_id");
  CREATE INDEX "_resume_v_version_version_preview_image_idx" ON "_resume_v" USING btree ("version_preview_image_id");
  CREATE INDEX "_resume_v_version_version_updated_at_idx" ON "_resume_v" USING btree ("version_updated_at");
  CREATE INDEX "_resume_v_version_version_created_at_idx" ON "_resume_v" USING btree ("version_created_at");
  CREATE INDEX "_resume_v_version_version__status_idx" ON "_resume_v" USING btree ("version__status");
  CREATE INDEX "_resume_v_created_at_idx" ON "_resume_v" USING btree ("created_at");
  CREATE INDEX "_resume_v_updated_at_idx" ON "_resume_v" USING btree ("updated_at");
  CREATE INDEX "_resume_v_latest_idx" ON "_resume_v" USING btree ("latest");
  CREATE INDEX "_resume_v_autosave_idx" ON "_resume_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_hackathons_id_idx" ON "payload_locked_documents_rels" USING btree ("hackathons_id");
  CREATE INDEX "payload_locked_documents_rels_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_id");
  CREATE INDEX "payload_locked_documents_rels_contributions_id_idx" ON "payload_locked_documents_rels" USING btree ("contributions_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_resume_id_idx" ON "payload_locked_documents_rels" USING btree ("resume_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_navigation_order_idx" ON "site_settings_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_navigation_parent_id_idx" ON "site_settings_navigation" USING btree ("_parent_id");
  CREATE INDEX "site_settings_homepage_pillars_order_idx" ON "site_settings_homepage_pillars" USING btree ("_order");
  CREATE INDEX "site_settings_homepage_pillars_parent_id_idx" ON "site_settings_homepage_pillars" USING btree ("_parent_id");
  CREATE INDEX "site_settings_portrait_idx" ON "site_settings" USING btree ("portrait_id");
  CREATE INDEX "site_settings_seo_seo_image_idx" ON "site_settings" USING btree ("seo_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "projects_technologies" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_technologies" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "events_gallery" CASCADE;
  DROP TABLE "events_responsibilities" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_version_gallery" CASCADE;
  DROP TABLE "_events_v_version_responsibilities" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP TABLE "hackathons_gallery" CASCADE;
  DROP TABLE "hackathons_team" CASCADE;
  DROP TABLE "hackathons_technologies" CASCADE;
  DROP TABLE "hackathons" CASCADE;
  DROP TABLE "hackathons_rels" CASCADE;
  DROP TABLE "_hackathons_v_version_gallery" CASCADE;
  DROP TABLE "_hackathons_v_version_team" CASCADE;
  DROP TABLE "_hackathons_v_version_technologies" CASCADE;
  DROP TABLE "_hackathons_v" CASCADE;
  DROP TABLE "_hackathons_v_rels" CASCADE;
  DROP TABLE "experience_responsibilities" CASCADE;
  DROP TABLE "experience_achievements" CASCADE;
  DROP TABLE "experience" CASCADE;
  DROP TABLE "experience_rels" CASCADE;
  DROP TABLE "_experience_v_version_responsibilities" CASCADE;
  DROP TABLE "_experience_v_version_achievements" CASCADE;
  DROP TABLE "_experience_v" CASCADE;
  DROP TABLE "_experience_v_rels" CASCADE;
  DROP TABLE "contributions_responsibilities" CASCADE;
  DROP TABLE "contributions_gallery" CASCADE;
  DROP TABLE "contributions_verified_metrics" CASCADE;
  DROP TABLE "contributions" CASCADE;
  DROP TABLE "contributions_rels" CASCADE;
  DROP TABLE "_contributions_v_version_responsibilities" CASCADE;
  DROP TABLE "_contributions_v_version_gallery" CASCADE;
  DROP TABLE "_contributions_v_version_verified_metrics" CASCADE;
  DROP TABLE "_contributions_v" CASCADE;
  DROP TABLE "_contributions_v_rels" CASCADE;
  DROP TABLE "organizations" CASCADE;
  DROP TABLE "organizations_rels" CASCADE;
  DROP TABLE "_organizations_v" CASCADE;
  DROP TABLE "_organizations_v_rels" CASCADE;
  DROP TABLE "articles_tags" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "_articles_v_version_tags" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "_skills_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "_media_v" CASCADE;
  DROP TABLE "resume" CASCADE;
  DROP TABLE "_resume_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_navigation" CASCADE;
  DROP TABLE "site_settings_homepage_pillars" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_projects_category";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_category";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_events_category";
  DROP TYPE "public"."enum_events_role";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_category";
  DROP TYPE "public"."enum__events_v_version_role";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_hackathons_status";
  DROP TYPE "public"."enum__hackathons_v_version_status";
  DROP TYPE "public"."enum_experience_status";
  DROP TYPE "public"."enum__experience_v_version_status";
  DROP TYPE "public"."enum_contributions_status";
  DROP TYPE "public"."enum__contributions_v_version_status";
  DROP TYPE "public"."enum_organizations_status";
  DROP TYPE "public"."enum__organizations_v_version_status";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_skills_category";
  DROP TYPE "public"."enum_skills_status";
  DROP TYPE "public"."enum__skills_v_version_category";
  DROP TYPE "public"."enum__skills_v_version_status";
  DROP TYPE "public"."enum_media_status";
  DROP TYPE "public"."enum__media_v_version_status";
  DROP TYPE "public"."enum_resume_status";
  DROP TYPE "public"."enum__resume_v_version_status";`)
}
