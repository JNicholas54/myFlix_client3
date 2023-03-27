import { useState } from "react"; // useState is a hook that allows you to add a state variable to your component
import { useEffect } from "react"; // useEffect is a hook that runs a callback function when any of its dependencies change

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types"; //as props transmit data between components, proptypes validates the data types based on the apps config

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      //fetch("https://guarded-wave-99547.herokuapp.com/movies")
      fetch("http://localhost:8080/users")
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.docs.map((doc) => {
            return {
              id: doc.key,
              title: doc.title,
              image: doc.ImgURL, // I'm not sure if "doc.ImgURL" is the correct input here
              director: doc.director_name?.[0]
            };
          });
          
          setMovies(moviesFromApi);
      });
    }, []); // the array here is called a dependency array which is an array that contains the state variables or functions which are keeping an eye for any changes

    if (!user) {
      return <LoginView onLoggedIn={(user) => setUser(user)} />;
    }

    if(selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>This list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie} // the left most movie is the name of the prop
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};

//============================ BELOW ARE THE MOVIES AND USERS FROM MY DATABASE ============================

    // ============================================ MOVIES ====================================================
/* {
  _id: "633e21c719c1bf1889036e49",
  Title: 'Good Will Hunting',
  Story: 'Will Hunting, a janitor at MIT, has a gift for mathematics but needs help from a psychologist to find direction in his life.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Gus Van Sant',
    Bio: 'Gus Green Van Sant Jr. is an American filmmaker, painter, screenwriter, photographer and musician from Louisville, Kentucky who is known for directing films such as Good Will Hunting, the 1998 remake of Psycho, Gerry, Elephant, My Own Private Idaho, To Die For, Milk, Last Days, Finding Forrester, Promised Land, Drugstore Cowboy and Mala Noche.',
    dob: 'July 24, 1952'
  },
  Stars: 'Matt Damon, Robin Williams, Ben Affleck, Stellan Skarsgård, Minnie Driver',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f55bc19c1bf1889036e4a",
  Title: 'A Few Good Men',
  Story: 'When cocky military lawyer Lt. Daniel Kaffee and his co-counsel, Lt. Cmdr. JoAnne Galloway, are assigned to a murder case, they uncover a hazing ritual that could implicate high-ranking officials such as shady Col. Nathan Jessep.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Rob Reiner',
    Bio: 'Robert Reiner was born in New York City, to Estelle Reiner (née Lebost) and Emmy-winning actor, comedian, writer, and producer Carl Reiner. As a child, his father was his role model, as Carl Reiner created and starred in The Dick Van Dyke Show.',
    dob: 'March 6, 1947'
  },
  Stars: 'Tom Cruise, Jack Nicholson, Demi Moore, Kevin Bacon, Kiefer Sutherland',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BMmRlZDQ1MmUtMzE2Yi00YTkxLTk1MGMtYmIyYWQwODcxYzRlXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f591c19c1bf1889036e4b",
  Title: 'My Cousin Vinny',
  Story: 'Two New Yorkers accused of murder in rural Alabama while on their way back to college call in the help of one of their cousins, a loudmouth lawyer with no trial experience.',
  Genre: {
    Name: 'Comedy',
    Description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter, especially in theatre, film, stand-up comedy, television, radio, books, or any other entertainment medium.'
  },
  Director: {
    Name: 'Johnathan Lynn',
    Bio: 'Jonathan Lynn and Antony Jay created and wrote every episode of the acclaimed BBC political comedy series Yes Minister (1980) and Yes, Prime Minister (1986).',
    dob: 'April 3, 1943'
  },
  Stars: 'Joe Pesci, Marisa Tomei, Ralph Macchio',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BMTQxNDYzMTg1M15BMl5BanBnXkFtZTgwNzk4MDgxMTE@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f5ad319c1bf1889036e4c",
  Title: 'Cast Away',
  Story: 'A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.',
  Genre: {
    Name: 'Adventure',
    Description: 'The adventure genre consists of books where the protagonist goes on an epic journey, either personally or geographically.'
  },
  Director: {
    Name: 'Robert Zemeckis',
    Bio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies.",
    dob: 'May 14, 1951'
  },
  Stars: 'Tom Hanks, Helen Hunt, Paul Sanchez',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BN2Y5ZTU4YjctMDRmMC00MTg4LWE1M2MtMjk4MzVmOTE4YjkzXkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f5c2119c1bf1889036e4d",
  Title: 'A Nightmare on Elm Street',
  Story: 'Teenager Nancy Thompson must uncover the dark truth concealed by her parents after she and her friends become targets of the spirit of a serial killer with a bladed glove in their dreams, in which if they die, it kills them in real life.',
  Genre: {
    Name: 'Horror',
    Description: 'Horror is a genre of fiction whose purpose is to create feelings of fear, dread, repulsion, and terror in the audience'
  },
  Director: {
    Name: 'Wes Craven',
    Bio: 'Wesley Earl Craven was born in Cleveland, Ohio, to Caroline (Miller) and Paul Eugene Craven. He had a midwestern suburban upbringing. His first feature film was The Last House on the Left (1972), which he wrote, directed, and edited.',
    dob: 'August 2, 1939'
  },
  Stars: 'Heather Langenkamp, Johnny Depp, Robert Englund',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BNzFjZmM1ODgtMDBkMS00NWFlLTg2YmUtZjc3ZTgxMjE1OTI2L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f5d6319c1bf1889036e4e",
  Title: 'Scream 2',
  Story: 'Two years after the first series of murders, as Sidney acclimates to college life, someone donning the Ghostface costume begins a new string of killings.',
  Genre: {
    Name: 'Horror',
    Description: 'Horror is a genre of fiction whose purpose is to create feelings of fear, dread, repulsion, and terror in the audience'
  },
  Director: {
    Name: 'Wes Craven',
    Bio: 'Wesley Earl Craven was born in Cleveland, Ohio, to Caroline (Miller) and Paul Eugene Craven. He had a midwestern suburban upbringing. His first feature film was The Last House on the Left (1972), which he wrote, directed, and edited.',
    dob: 'August 2, 1939'
  },
  Stars: 'Neve Campbell, Courteney Cox, David Arquette',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BMTIxNTMzNzYtNzA3NC00MzgwLTlhNGYtMDEyYTNlZjcwZTNiXkEyXkFqcGdeQXVyNDAxNjkxNjQ@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f61f43d2400bbc5625cf6",
  Title: 'A Beautiful Mind',
  Story: 'After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Ron Howard',
    Bio: "Academy Award-winning filmmaker Ron Howard is one of this generation's most popular directors. From the critically acclaimed dramas A Beautiful Mind (2001) and Apollo 13 (1995) to the hit comedies Parenthood (1989) and Splash (1983), he has created some of Hollywood's most memorable films.",
    dob: 'March 1, 1954'
  },
  Stars: 'Russel Crowe, Ed Harris, Jennifer Connelly',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BMzcwYWFkYzktZjAzNC00OGY1LWI4YTgtNzc5MzVjMDVmNjY0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f62f23d2400bbc5625cf7",
  Title: 'Remember the Titans',
  Story: 'The true story of a newly appointed African-American coach and his high school team on their first season as a racially integrated unit.',
  Genre: {
    Name: 'Drama',
    Description: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
  },
  Director: {
    Name: 'Boaz Yakin',
    Bio: 'Boaz Yakin was born in 1966 in New York City, New York, USA. He is a writer and producer, known for Fresh (1994), Remember the Titans (2000) and The Harder They Fall (2021).',
    dob: 'June 20, 1966'
  },
  Stars: 'Denzel Washington, Will Patton, Wood Harris',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BYThkMzgxNjEtMzFiOC00MTI0LWI5MDItNDVmYjA4NzY5MDQ2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f646a3d2400bbc5625cf8",
  Title: 'Jurassic Park',
  Story: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose",
  Genre: {
    Name: 'Action',
    Description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
  },
  Director: {
    Name: 'Steven Speilberg',
    Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
    dob: 'December 18, 1946'
  },
  Stars: 'Sam Worthington, Zoe Saldana, Siguorney Weaver',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_UX67_CR0,0,67,98_AL_.jpg'
},
{
  _id: "633f66483d2400bbc5625cf9",
  Title: 'Avatar',
  Story: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
  Genre: {
    Name: 'Fantasy',
    Description: 'Fantasy fiction is a genre of writing in which the plot could not happen in real life (as we know it, at least).'
  },
  Director: {
    Name: 'James Cameron',
    Bio: 'James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. James Cameron is now one of the most sought-after directors in Hollywood.',
    dob: 'August 16, 1954'
  },
  Stars: 'Sam Worthington, Zoe Saldana, Siguorney Weaver',
  ImgURL: 'https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_UX67_CR0,0,67,98_AL_.jpg'
}

//      ============================================ USERS ====================================================
[
  {
    _id: ObjectId("6350331f36edf6061b707892"),
    Username: 'Jeremy',
    Password: 'jeremypass',
    Email: 'jeremy@email.com',
    Birthday: ISODate("1992-01-27T08:00:00.000Z"),
    FavoriteMovies: []
  },
  {
    _id: ObjectId("635033c936edf6061b707893"),
    Username: 'Melissa',
    Password: 'melissapass',
    Email: 'melissa@email.com',
    Birthday: ISODate("1991-09-24T07:00:00.000Z"),
    FavoriteMovies: []
  },
  {
    _id: ObjectId("6350343436edf6061b707894"),
    Username: 'Fiona',
    Password: 'fionapass',
    Email: 'fiona@email.com',
    Birthday: ISODate("2023-01-15T08:00:00.000Z"),
    FavoriteMovies: []
  },
  {
    _id: ObjectId("6350349f36edf6061b707895"),
    Username: 'Dawn',
    Password: 'dawnpass',
    Email: 'dawn@email.com',
    Birthday: ISODate("1969-01-08T08:00:00.000Z"),
    FavoriteMovies: []
  },
  {
    _id: ObjectId("635035ab36edf6061b707896"),
    Username: 'Keith',
    Password: 'keithpass',
    Email: 'keith@email.com',
    Birthday: ISODate("1965-10-12T07:00:00.000Z"),
    FavoriteMovies: []
  },
  {
    _id: ObjectId("63613a9595f339b8176ed28c"),
    Username: 'Frank',
    Password: 'frankpass',
    Email: 'frank@email.com',
    Birthday: ISODate("1966-06-24T07:00:00.000Z"),
    FavoriteMovies: [],
    __v: 0
  }
]
*/