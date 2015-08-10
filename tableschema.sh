 TABLE beers (
    id integer NOT NULL,
    beer text,
    brewer text,
    store integer,
    size text,
    qty text,
    price text,
    link text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
)
 TABLE pkg (
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    qty integer,
    container character varying(255),
    size numeric
)
 TABLE price (
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    price numeric,
    "beerId" integer,
    "storeId" integer,
    "pkgId" integer
)
 TABLE store (
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "googleId" character varying(255),
    name character varying(255)
)
 TABLE beer_staging (
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
)
 TABLE beersize (
    us_oz numeric NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name character varying(255)
)
 TABLE price_audit (
    id integer NOT NULL,
    "storeId" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
)
