const cucumber = require('cypress-cucumber-preprocessor').default
const fs = require('fs');

const graphQlSchema = fs.readFileSync('schema.graphql', 'utf8');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  config.env.GRAPHQL_SCHEMA = graphQlSchema;
  return config;
}
