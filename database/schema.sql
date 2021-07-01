set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" timestamp NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "doing" (
	"userId" serial NOT NULL,
	"cards" TEXT NOT NULL,
	"cardID" serial NOT NULL,
	CONSTRAINT "doing_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "todos" (
	"userId" serial NOT NULL,
	"cards" TEXT NOT NULL,
	"cardID" serial NOT NULL,
	CONSTRAINT "todos_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Done" (
	"userId" serial NOT NULL,
	"cards" TEXT NOT NULL,
	"cardID" serial NOT NULL,
	CONSTRAINT "Done_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "doing" ADD CONSTRAINT "doing_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "todos" ADD CONSTRAINT "todos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "Done" ADD CONSTRAINT "Done_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
