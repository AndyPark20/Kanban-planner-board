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
	"cardId" integer NOT NULL,
	primary key ("cardId")
);

CREATE TABLE "record" (
	"activityId" serial NOT NULL,
	"cardId" serial NOT NULL,
	"record" TEXT NOT NULL,
	"time" TEXT NOT NULL,
	primary key ("cardId")
);


ALTER TABLE "activities" ADD CONSTRAINT "activities_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "record" ADD CONSTRAINT "record_fk0" FOREIGN KEY ("cardId") REFERENCES "activities"("cardId");
