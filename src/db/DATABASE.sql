-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" text NULL,
	email text NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	password_hash text NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


-- public.tasks definition

-- Drop table

-- DROP TABLE public.tasks;

CREATE TABLE public.tasks (
	id serial4 NOT NULL,
	title text NOT NULL,
	"content" text NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	finished_at timestamp(3) NULL,
	"ownerId" int4 NULL,
	CONSTRAINT tasks_pkey PRIMARY KEY (id),
	CONSTRAINT "tasks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.subtasks definition

-- Drop table

-- DROP TABLE public.subtasks;

CREATE TABLE public.subtasks (
	id serial4 NOT NULL,
	title text NOT NULL,
	"content" text NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	finished_at timestamp(3) NULL,
	"taskId" int4 NOT NULL,
	CONSTRAINT subtasks_pkey PRIMARY KEY (id),
	CONSTRAINT "subtasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public.tasks(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- public.sessions definition

-- Drop table

-- DROP TABLE public.sessions;

CREATE TABLE public.sessions (
	id serial4 NOT NULL,
	session_token text NOT NULL,
	user_id int4 NOT NULL,
	expires timestamp(3) NOT NULL,
	CONSTRAINT sessions_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX sessions_session_token_key ON public.sessions USING btree (session_token);


-- public.sessions foreign keys

ALTER TABLE public.sessions ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE;
