set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "public.users" (
"userId" serial NOT NULL,
	"firstName"text NOT NULL,
	"lastName" text NOT NULL,
	"userName" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" timestamp NOT NULL default now(),
	 primary key ("userId")
);



CREATE TABLE "public.Task" (
	"userId" integer NOT NULL,
	"activities" TEXT NOT NULL,
	"cardId" serial NOT NULL
);




ALTER TABLE "Task" ADD CONSTRAINT "Task_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
