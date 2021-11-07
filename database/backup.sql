CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
);


CREATE TABLE "users" (
    "id" SERIAL NOT NULL, 
    "client_user_id" varchar NOT NULL, 
    "client_user_email" varchar NOT NULL
);