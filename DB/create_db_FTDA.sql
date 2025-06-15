-- Create the database
CREATE DATABASE "FTDA"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Create schema
CREATE SCHEMA IF NOT EXISTS public
    AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';
GRANT USAGE ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO pg_database_owner;

-- Create sequence
CREATE SEQUENCE IF NOT EXISTS public."TB_BLOCKCHAIN_TRXS_ETH_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Create table
CREATE TABLE IF NOT EXISTS public."TB_BLOCKCHAIN_TRXS_ETH"
(
    "ID" integer NOT NULL DEFAULT nextval('"TB_BLOCKCHAIN_TRXS_ETH_ID_seq"'::regclass),
    "LOGS" jsonb,
    "CREATED_AT" timestamp with time zone DEFAULT now(),
    "TXDATA" jsonb,
    "BLOCK_DATA" jsonb,
    CONSTRAINT "TB_BLOCKCHAIN_TRXS_ETH_pkey" PRIMARY KEY ("ID")
)

ALTER TABLE IF EXISTS public."TB_BLOCKCHAIN_TRXS_ETH"
    OWNER TO postgres;


-- Table: public.TB_BLOCKCHAIN_TRXS_SOL

-- DROP TABLE IF EXISTS public."TB_BLOCKCHAIN_TRXS_SOL";

CREATE TABLE IF NOT EXISTS public."TB_BLOCKCHAIN_TRXS_SOL"
(
    "ID" integer NOT NULL DEFAULT nextval('"TB_BLOCKCHAIN_TRXS_SOL_ID_seq"'::regclass),
    "CREATED_AT" timestamp with time zone DEFAULT now(),
    "TXDATA" jsonb,
    "BLOCK_DATA" jsonb,
    CONSTRAINT "TB_BLOCKCHAIN_TRXS_SOL_pkey" PRIMARY KEY ("ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."TB_BLOCKCHAIN_TRXS_SOL"
    OWNER to postgres;
