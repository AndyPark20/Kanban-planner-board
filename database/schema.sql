set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "users" (
	"userId" integer NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"userName" serial NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" timestamp NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Todo" (
	"userId" integer NOT NULL,
	"card" TEXT NOT NULL,
	"cardId" integer NOT NULL,
	CONSTRAINT "Todo_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Doing" (
	"userId" integer NOT NULL,
	"card" TEXT NOT NULL,
	"cardId" integer NOT NULL,
	CONSTRAINT "Doing_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Done" (
	"userId" integer NOT NULL,
	"card" TEXT NOT NULL,
	"cardId" integer NOT NULL,
	CONSTRAINT "Done_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Todo" ADD CONSTRAINT "Todo_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "Doing" ADD CONSTRAINT "Doing_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "Done" ADD CONSTRAINT "Done_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
