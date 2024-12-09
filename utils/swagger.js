const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for a backend application",
      contact: {
        name: "Ahmad Khalifa",
        email: "khalifa14112003@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc123",
            },
            fname: {
              type: "string",
              example: "Ahmad",
            },
            lname: {
              type: "string",
              example: "Khalifa",
            },
            email: {
              type: "string",
              format: "email",
              example: "ahmad.khalifa@example.com",
            },
            phone: {
              type: "string",
              example: "+201001234567",
            },
            password: {
              type: "string",
              format: "password",
              example: "password123",
            },
            image: {
              type: "string",
              example: "https://example.com/user.jpg",
            },
            watchlist: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc456",
              },
            },
            favorites: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc789",
              },
            },
            reviews: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc987",
              },
            },
            passwordChangedAt: {
              type: "string",
              format: "date-time",
              example: "2023-12-01T10:00:00Z",
            },
            passwordResetCode: {
              type: "string",
              example: "123456",
            },
            passwordResetExpires: {
              type: "string",
              format: "date-time",
              example: "2023-12-08T10:00:00Z",
            },
            passwordResetVerified: {
              type: "boolean",
              example: true,
            },
            role: {
              type: "string",
              enum: ["user", "manager", "admin"],
              example: "user",
            },
            active: {
              type: "boolean",
              example: true,
            },
            wishlist: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc555",
              },
            },
          },
        },
        TVShow: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc987",
            },
            name: {
              type: "string",
              example: "Breaking Bad",
            },
            original_name: {
              type: "string",
              example: "Breaking Bad",
            },
            overview: {
              type: "string",
              example:
                "A high school chemistry teacher turned methamphetamine producer.",
            },
            first_air_date: {
              type: "string",
              format: "date",
              example: "2008-01-20",
            },
            last_air_date: {
              type: "string",
              format: "date",
              example: "2013-09-29",
            },
            status: {
              type: "string",
              enum: ["Airing", "Ended", "Cancelled"],
              example: "Ended",
            },
            language: {
              type: "string",
              example: "English",
            },
            poster_path: {
              type: "string",
              example: "https://example.com/poster.jpg",
            },
            backdrop_path: {
              type: "string",
              example: "https://example.com/backdrop.jpg",
            },
            genres: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc456",
              },
            },
            networks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "AMC",
                  },
                  logo_path: {
                    type: "string",
                    example: "https://example.com/logo.png",
                  },
                  country: {
                    type: "string",
                    example: "US",
                  },
                },
              },
            },
            production_companies: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc789",
              },
            },
            cast: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc123",
              },
            },
            crew: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc987",
              },
            },
            seasons: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  season_number: {
                    type: "integer",
                    example: "1",
                  },
                  episode_count: {
                    type: "integer",
                    example: "7",
                  },
                  air_date: {
                    type: "string",
                    format: "date",
                    example: "2008-01-20",
                  },
                  poster_path: {
                    type: "string",
                    example: "https://example.com/season-poster.jpg",
                  },
                  overview: {
                    type: "string",
                    example: "The beginning of Walter White's journey.",
                  },
                },
              },
            },
            popularity: {
              type: "number",
              example: "98.7",
            },
          },
        },
        Collection: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc123",
            },
            name: {
              type: "string",
              example: "Action Movies",
            },
            overview: {
              type: "string",
              example: "A collection of the best action-packed movies.",
            },
            poster_path: {
              type: "string",
              example: "https://example.com/collection-poster.jpg",
            },
            backdrop_path: {
              type: "string",
              example: "https://example.com/collection-backdrop.jpg",
            },
            movies: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc456",
              },
            },
          },
        },
        Company: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc123",
            },
            name: {
              type: "string",
              example: "Warner Bros",
            },
            logo_path: {
              type: "string",
              example: "https://example.com/warner-logo.jpg",
            },
            origin_country: { type: "string", example: "US" },
            movies: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc789",
              },
            },
          },
        },
        Genre: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64bf493f3c0d3c1a4bafc123" },
            name: { type: "string", example: "Action" },
            description: {
              type: "string",
              example:
                "Action movies are characterized by intense physical action sequences.",
            },
          },
        },
        Movie: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc123",
            },
            title: { type: "string", example: "Mad Max: Fury Road" },
            original_title: { type: "string", example: "Mad Max: Fury Road" },
            tagline: { type: "string", example: "What a lovely day." },
            overview: {
              type: "string",
              example:
                "In a post-apocalyptic world, Max teams up with a rebel warrior.",
            },
            runtime: { type: "integer", example: "120" },
            release_date: {
              type: "string",
              format: "date",
              example: "2015-05-15",
            },
            status: {
              type: "string",
              enum: ["Released", "Post-production", "Cancelled", "Rumored"],
              example: "Released",
            },
            language: { type: "string", example: "English" },
            budget: { type: "number", example: "150000000" },
            revenue: { type: "number", example: "375000000" },
            poster_path: {
              type: "string",
              example: "https://example.com/movie-poster.jpg",
            },
            backdrop_path: {
              type: "string",
              example: "https://example.com/movie-backdrop.jpg",
            },
            genres: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc456",
              },
            },
            production_companies: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc789",
              },
            },
            production_countries: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  country: {
                    type: "string",
                    example: "Australia",
                  },
                  iso_3166_1: {
                    type: "string",
                    example: "AU",
                  },
                },
              },
            },
            spoken_languages: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  language: {
                    type: "string",
                    example: "English",
                  },
                  iso_639_1: {
                    type: "string",
                    example: "en",
                  },
                },
              },
            },
            cast: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc123",
              },
            },
            crew: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc987",
              },
            },
            keywords: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc234",
              },
              collection: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc456",
              },
              vote_count: { type: "integer", example: "12000" },
              vote_average: { type: "number", example: "8.5" },
              popularity: { type: "number", example: "9.2" },
            },
          },
        },
        Person: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc123",
            },
            name: {
              type: "string",
              example: "Tom Hardy",
            },
            biography: {
              type: "string",
              example: "Tom Hardy is an English actor and producer.",
            },
            birthday: {
              type: "string",
              format: "date",
              example: "1977-09-15",
            },
            deathday: {
              type: "string",
              format: "date",
              example: "2023-12-01",
            },
            place_of_birth: {
              type: "string",
              example: "Hammersmith, London, England",
            },
            profile_path: {
              type: "string",
              example: "https://example.com/tom-hardy-profile.jpg",
            },
            known_for: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc789",
              },
            },
            roles: {
              type: "array",
              items: {
                type: "string",
                enum: ["Actor", "Director", "Writer", "Producer"],
                example: "Actor",
              },
            },
            movie_credits: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc234",
              },
            },
            tv_credits: {
              type: "array",
              items: {
                type: "string",
                example: "64bf493f3c0d3c1a4bafc567",
              },
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc234",
            },
            user: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc123",
            },
            content: {
              type: "string",
              example: "Amazing movie, loved every moment of it!",
            },
            rating: {
              type: "number",
              minimum: "0",
              maximum: "10",
              example: "9",
            },
            movie: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc789",
            },
            tvShow: {
              type: "string",
              example: "64bf493f3c0d3c1a4bafc567",
            },
            createdAt: {
              type: "string",
              format: "date - time",
              example: "2023-12-09T10:00:00Z",
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

module.exports = swaggerJsDoc(swaggerOptions);
