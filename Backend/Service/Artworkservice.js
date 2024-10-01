
const Art = require('../Model/PortofolioSchema');


const createArt = async (artData) => {
  const { artname, arttype, artimage, medium, artsize, year, description, exhibition, location,artvedio } = artData;
  if (!artname || !arttype || !artimage || !medium || !year || !description ||!exhibition ||! artvedio) {
    throw new Error('All fields are mandatory');
  }
  const newArt = await Art.create({
    artname,
    arttype,
    artimage, 
    medium,
    artsize,
    year,
    description,
    exhibition,
    location,
    artvedio
  });
  return newArt;
};


const getAllArtworks = async () => {
    const artworks = await Art.find(); 
    return artworks;
  };


const getArtworkById = async (id) => {
    const artwork = await Art.findById(id);  //get artwork by id
    if (!artwork) {
      throw new Error('Artwork not found');
    }
    return artwork;
  };
 
const deleteArtwork = async (id) => {
    const artwork = await Art.findByIdAndDelete(id);
    if (!artwork) {
      throw new Error('Artwork not found');
    }
    return artwork;
  };
  

  const updateArtwork = async (id, artData) => {
    const { artname, arttype, artimage, medium, artsize, year, description, exhibition, location } = artData;
  
    const updatedArt = await Art.findByIdAndUpdate(
      id,
      {
        artname,
        arttype,
        artimage,  // Updated public IDs of the images
        medium,
        artsize,
        year,
        description,
        exhibition,
        artvedio,
        location
      },
      { new: true }  // Return the updated document
    );
  
    if (!updatedArt) {
      throw new Error('Artwork not found');
    }
  
    return updatedArt;
  };
  
  



module.exports = {
  createArt,getAllArtworks,getArtworkById,deleteArtwork,updateArtwork
};

