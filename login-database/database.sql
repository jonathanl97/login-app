--
-- PostgreSQL database dump
--

\restrict M7RSu1Hll4fZ4NwjlzBpIKFk7W1qhVr4i1JfwGIdnIcJsfr2SSBQQs0KfKCA4Xh

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-11 15:27:44

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
-- TOC entry 4923 (class 1262 OID 16411)
-- Name: api; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE api WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';


\unrestrict M7RSu1Hll4fZ4NwjlzBpIKFk7W1qhVr4i1JfwGIdnIcJsfr2SSBQQs0KfKCA4Xh
\connect api
\restrict M7RSu1Hll4fZ4NwjlzBpIKFk7W1qhVr4i1JfwGIdnIcJsfr2SSBQQs0KfKCA4Xh

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 222 (class 1259 OID 24592)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) with time zone NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16413)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(127) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone,
    name character varying(31) NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16412)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4761 (class 2604 OID 16416)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4769 (class 2606 OID 24601)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 4764 (class 2606 OID 24584)
-- Name: users users_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email UNIQUE (email);


--
-- TOC entry 4766 (class 2606 OID 16419)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4767 (class 1259 OID 24628)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 4770 (class 2620 OID 24615)
-- Name: users set_updated; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_updated BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.moddatetime('updated_at');


-- Completed on 2026-06-11 15:27:45

--
-- PostgreSQL database dump complete
--

\unrestrict M7RSu1Hll4fZ4NwjlzBpIKFk7W1qhVr4i1JfwGIdnIcJsfr2SSBQQs0KfKCA4Xh
