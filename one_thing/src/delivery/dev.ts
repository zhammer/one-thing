import { makeApolloServer } from './apollo';

const auth0ClientId = process.env.AUTH0_CLIENT_ID || 'auth0_client_id';
const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET || 'auth0_client_secret';
const postgresUrl = process.env.DATABASE_CONNECTION_STRING;

const server = makeApolloServer({
  auth0ClientId,
  auth0ClientSecret,
  postgresUrl,
  dev: true
});
server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}`));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
