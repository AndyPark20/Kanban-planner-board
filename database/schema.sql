set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName"text NOT NULL,
	"lastName" text NOT NULL,
	"userName" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp NOT NULL default now(),
	 primary key ("userId")
);



CREATE TABLE "activities" (
	"userId" integer NOT NULL,
	"column" text NOT NULL,
	"card" text NOT NULL,
	"cardId" serial NOT NULL,
	primary key ("cardId")
);

CREATE TABLE "public.activities" (
	"activityId" serial NOT NULL,
	"cardId" serial NOT NULL,
	"record" TEXT NOT NULL,
	"time" integer NOT NULL,
	primary key ("cardId")
);


ALTER TABLE "activities" ADD CONSTRAINT "activities_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "activities" ADD CONSTRAINT "activities_fk0" FOREIGN KEY ("cardId") REFERENCES "Task"("cardId");
