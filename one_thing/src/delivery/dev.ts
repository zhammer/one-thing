import { makeApolloServer } from './apollo';

const server = makeApolloServer({
  dev: true
});
server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}`));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
