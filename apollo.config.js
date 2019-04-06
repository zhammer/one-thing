module.exports = {
  client: {
    includes: ["./web_client/src/**"],
    service: {
      name: "one-thing",
      localSchemaFile: "./schema.graphql"
    }
  }
};
