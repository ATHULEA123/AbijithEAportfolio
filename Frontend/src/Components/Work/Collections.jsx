import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./slider.css";

const Collections = ({ isDarkMode }) => {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialFilter = queryParams.get('filter') || 'all';
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/getallart`);
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('filter') !== filter) {
      params.set('filter', filter);
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [filter, location.search, navigate]);

  const handleArtworkClick = (artwork) => {
    navigate(`/artwork/${artwork._id}`, { state: { artwork } });
  };

  const filteredArtworks =
    filter === "all"
      ? artworks
      : artworks.filter((artwork) =>
          artwork.arttype.trim().toLowerCase() === filter.trim().toLowerCase()
        );

  return (
    <>
      <div className="md:w-1/6 p-5 rounded-lg  transition duration-300 animate-fade-in">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select-filter w-1/4 sm:w-full p-2 border rounded text-black bg-gray-200 hover:bg-black hover:text-white focus:outline-none focus:bg-black focus:text-white transition duration-300"
        >
          <option value="all">All</option>
          <option value="installation">Installation</option>
          <option value="painting">Painting</option>
          <option value="public art">Public Art</option>
          <option value="sculpture">Sculpture</option>
          <option value="sketches">Sketches</option>
          <option value="Studio Space">Studio Space</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 p-5 flex-1 lg:gap-y-20">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((artwork, index) => (
              <div
                key={artwork._id}
                className="works_img cursor-pointer transform hover:scale-105 transition duration-500 ease-in-out animate-slide-up"
                onClick={() => handleArtworkClick(artwork)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={artwork.artimage[0]}
                  className="w-full h-auto object-cover rounded-sm"
                  alt={artwork.artname}
                />
                <div className="text-content">
                  <p className={` ${isDarkMode ? 'text-black' : 'text-white'} py-2 text-xl font-bold font-serif md:text-2xl`}>
                    {artwork.artname}
                  </p>
                  <p className={` ${isDarkMode ? 'text-black' : 'text-white'} font-serif text-lg md:text-lg`}>
                    {artwork.arttype}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={` ${isDarkMode ? 'text-black' : 'text-white'} animate-fade-in`}>
              No artworks available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Collections;