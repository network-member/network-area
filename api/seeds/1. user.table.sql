CREATE TABLE
  users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO
  users (email, password)
VALUES
  (
    'admin@mail.ru',
    '$argon2id$v=19$m=65536,t=3,p=4$MGQGgOMQS+KgSLZzzixJjg$+hKlDbOSA46nkrahyhEVEe/69VfHdk92v8gI+tPPgcg'
  );