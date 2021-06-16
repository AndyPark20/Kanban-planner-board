set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" serial NOT NULL,
	"password" TEXT NOT NULL,
 "createdAt" timestamp NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "todos" (
	"todoId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "todos_pk" PRIMARY KEY ("todoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "details" (
	"detailId" serial NOT NULL,
	"description" VARCHAR(255) NOT NULL,
	"createdBy" integer NOT NULL,
	CONSTRAINT "details_pk" PRIMARY KEY ("detailId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "activities" (
	"activityId" serial NOT NULL,
	"activity" VARCHAR(255) NOT NULL,
 "createdAt" timestamp NOT NULL default now(),
	"createdBy" integer NOT NULL,
	CONSTRAINT "activities_pk" PRIMARY KEY ("activityId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "todos" ADD CONSTRAINT "todos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "details" ADD CONSTRAINT "details_fk0" FOREIGN KEY ("createdBy") REFERENCES "todos"("todoId");

ALTER TABLE "activities" ADD CONSTRAINT "activities_fk0" FOREIGN KEY ("createdBy") REFERENCES "todos"("todoId");
