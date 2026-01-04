-- Note:
-- This script is only for local env and to improve developer productivity,
-- in prod this should NOT be used.


-- Create the auth database
SELECT 'CREATE DATABASE retail_auth'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'retail_auth')\gexec

-- Here is what \gexec does, if there is not DB then we get 'CREATE DATABASE retail_auth' string
-- and \gexec executes that.
-- However if the DB exists then empty string is returned by SELECT and \gexec throws no
-- no error, that's what makes it idempotent.


-- Create the catalog database
SELECT 'CREATE DATABASE retail_catalog'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'retail_catalog')\gexec

-- Grant permissions (optional but good practice)
GRANT ALL PRIVILEGES ON DATABASE retail_auth TO postgres;
GRANT ALL PRIVILEGES ON DATABASE retail_catalog TO postgres;