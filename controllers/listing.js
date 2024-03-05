const Listing = require('../models/Listing');

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createListing = async (req, res) => {
    try {
        const { name, businessPhone, city, address, images } = req.body;
        const newListing = await Listing.create({ name, businessPhone, city, address, images });
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateListing = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, businessPhone, city, address, images } = req.body;
      const updatedListing = await Listing.update(
        { name, businessPhone, city, address, images },
        { where: { id } }
      );
      res.json(updatedListing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteListing = async (req, res) => {
    try {
      const { id } = req.params;
      await Listing.destroy({ where: { id } });
      res.json({ message: 'Listing deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
  
