import HeaderNav from "../Header.jsx";

const Network = () => {
  const networkData = {
    actors: [
      { name: "Tom Hanks", connections: 12 },
      { name: "Leonardo DiCaprio", connections: 9 },
      { name: "Scarlett Johansson", connections: 8 },
      { name: "Brad Pitt", connections: 7 },
      { name: "Meryl Streep", connections: 6 },
    ],
    directors: [
      { name: "Christopher Nolan", movies: 10 },
      { name: "Quentin Tarantino", movies: 9 },
      { name: "Martin Scorsese", movies: 11 },
    ],
  };
  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <HeaderNav tab="network" />
      <h2 className="text-3xl font-bold mb-8">Actor & Crew Network Explorer</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Actor Connections */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top Actors</h2>
          <ul className="space-y-3">
            {networkData.actors.map((actor, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{actor.name}</span>
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                  {actor.connections} connections
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Director Filmography */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Top Directors</h2>
          <ul className="space-y-3">
            {networkData.directors.map((director, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{director.name}</span>
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  {director.movies} films
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Network;
