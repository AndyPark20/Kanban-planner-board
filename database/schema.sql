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



CREATE TABLE "Todo" (
	"userId" integer NOT NULL,
	"card" text NOT NULL,
	"cardId" serial NOT NULL,
	primary key ("cardId")
);



CREATE TABLE "Doing" (
	"userId" integer NOT NULL,
	"card" text NOT NULL,
	"cardId" serial NOT NULL,
	primary key ("cardId")
);



CREATE TABLE "Done" (
	"userId" integer NOT NULL,
	"card" text NOT NULL,
	"cardId" serial NOT NULL,
	primary key ("cardId")
);




ALTER TABLE "Todo" ADD CONSTRAINT "Todo_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "Doing" ADD CONSTRAINT "Doing_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "Done" ADD CONSTRAINT "Done_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
