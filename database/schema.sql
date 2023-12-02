set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text,
  "hashedPassword" text,
  "photoUrl" text,
  "createdAt" timestamptz
);

CREATE TABLE "messages" (
  "messageId" serial PRIMARY KEY,
  "userId" integer,
  "body" text,
  "sentAt" timestamptz DEFAULT (now()),
  "isGif" boolean
);

COMMENT ON COLUMN "users"."photoUrl" IS 'for profile photo';

ALTER TABLE "messages" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");
