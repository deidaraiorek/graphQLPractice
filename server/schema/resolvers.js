const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");
const resolvers = {
  Query: {
    users() {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    movies() {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.yearOfPublication >= 2007);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      console.log(user);
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let updateUser;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          updateUser = user;
        }
      });
      console.log(id, updateUser);
      return updateUser;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      let removedUser;
      _.remove(UserList, (user) => {
        user.id === Number(id);
        removedUser = user;
      });
      return removedUser;
    },
  },
};

module.exports = { resolvers };
