const Review = require('../models/Review');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReview = async (req, res) => {
    try {
      const { text, rating, userId, listingId } = req.body;
      const newReview = await Review.create({ text, rating, userId, listingId });
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
      const { id } = req.params;
      const { text, rating } = req.body;
      const updatedReview = await Review.update(
        { text, rating },
        { where: { id } }
      );
      res.json(updatedReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
      await Review.destroy({ where: { id } });
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
