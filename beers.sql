--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: beers; Type: TABLE; Schema: public; Owner: beerlover; Tablespace: 
--

CREATE TABLE beer_staging (
    id integer NOT NULL,
    store character varying,
    brewer character varying,
    beer character varying,
    link character varying,
    size character varying,
    qty character varying,
    price character varying,
    last_updated timestamp without time zone,
    "updatedAt" date,
    "createdAt" date,
    pkg character varying
);


ALTER TABLE public.beers OWNER TO beerlover;

--
-- Name: beers_id_seq; Type: SEQUENCE; Schema: public; Owner: beerlover
--


--ALTER TABLE public.beers_id_seq OWNER TO beerlover;

--
-- Name: beers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beerlover
--

--ALTER SEQUENCE beers_id_seq OWNED BY beers.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: beerlover
--

--ALTER TABLE ONLY beers ALTER COLUMN id SET DEFAULT nextval('beers_id_seq'::regclass);


--
-- Name: beers_pkey; Type: CONSTRAINT; Schema: public; Owner: beerlover; Tablespace: 
--

--ALTER TABLE ONLY beers
--    ADD CONSTRAINT beers_pkey PRIMARY KEY (id);


--
-- Name: beer_audit; Type: TRIGGER; Schema: public; Owner: beerlover
--

--CREATE TRIGGER beer_audit BEFORE INSERT ON beers FOR EACH ROW EXECUTE PROCEDURE process_beer_audit();


--
-- Name: beers_stamp_updated; Type: TRIGGER; Schema: public; Owner: beerlover
--

--CREATE TRIGGER beers_stamp_updated BEFORE INSERT OR UPDATE ON beers FOR EACH ROW EXECUTE PROCEDURE stamp_updated();


--
-- PostgreSQL database dump complete
--

