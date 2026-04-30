--
-- PostgreSQL database dump
--

\restrict flwjJqPQxNrbZPKqgPdVzQh1fzKorUv9zQ7TrPIr4XTT8MS0HplEJXNFLis5bcY

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: moddatetime; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS moddatetime WITH SCHEMA public;


--
-- Name: EXTENSION moddatetime; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION moddatetime IS 'functions for tracking last modification time';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: session; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.session OWNER TO me;

--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(127) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone
);


ALTER TABLE public.users OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO me;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.session (sid, sess, expire) FROM stdin;
j_t97ouLpwo6EtLuhf9IIj92niRAYJeR	{"cookie":{"originalMaxAge":86400000,"expires":"2026-04-30T08:46:24.933Z","httpOnly":true,"path":"/"},"passport":{"user":44}}	2026-04-30 10:46:25+02
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (id, email, password, created_at, updated_at) FROM stdin;
45	test@email.com	$2b$10$krBO3EqFJMcHzPQfrKNAX.W/IYxaKpnQ.1UQng2KYnA9mc2AriDay	2026-04-29 13:48:34+02	\N
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.users_id_seq', 45, true);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_email; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: me
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: users set_updated; Type: TRIGGER; Schema: public; Owner: me
--

CREATE TRIGGER set_updated BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.moddatetime('updated_at');


--
-- PostgreSQL database dump complete
--

\unrestrict flwjJqPQxNrbZPKqgPdVzQh1fzKorUv9zQ7TrPIr4XTT8MS0HplEJXNFLis5bcY

