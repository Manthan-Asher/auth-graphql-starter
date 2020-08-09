const graphql = require("graphql");
const {GraphQLObjectType, GraphQLString} = graphql;

const UserType = require("./types/user_type");
const {signup, login} = require("../services/auth");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signUp: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      resolve(parent, {email, password}, req) {
        return signup({email, password, req});
      },
    },
    logout: {
      type: UserType,
      resolve(parent, args, req) {
        const {user} = req;
        req.logout();
        return user;
      },
    },
    login: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      resolve(parent, {email, password}, req) {
        return login({email, password, req});
      },
    },
  },
});

module.exports = Mutation;
