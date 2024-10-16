
CREATE TABLE users (
    username text PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL,
    admin boolean DEFAULT false
);

-- {
--     username : "j_jackson12",
--     first_name: "Jack", 
--     last_name: "Jackson", 
--     email : "ajndb@bsdi.com",
--     phone: "276475903", 
--     password : "nukefuf09", 
--     admin : true
-- }