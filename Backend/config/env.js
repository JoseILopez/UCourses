const env = {
  port: 5000,

  DB: 'mongodb://localhost:27017/courses',

  FRONTEND: 'http://localhost:3500/',

  HTTP_CODES: {
    OK: 200,
    CREATED: 201,
    RESET: 205,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
  },
};

module.exports = env;
