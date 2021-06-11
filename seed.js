const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 230 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 530 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 550 }
    ]
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 260 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 200 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 300 }
    ]
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 400 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 70 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 60 }
    ]
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 100 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 100 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 50 }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Movie.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map(movie => ({
      ...movie,
      genre: { _id: genreId, name: genre.name }
    }));
    await Movie.insertMany(movies);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
