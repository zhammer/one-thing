import { makeApolloServer } from "./apollo";

const server = makeApolloServer();
server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}`));
