const Album = require('../models/album');
const Artist = require('../models/artist');

exports.create = (req, res) => {
  Artist.findOne({ _id: req.params.artistId }, (err, artist) => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      const album = new Album({
        name: req.body.name,
        year: req.body.year,
        artist: artist._id,
      });
      album.save().then(() => res.status(201).json(album));
    }
  });
};

exports.list = (req, res) => {
  Album.find().then(albums => {
    res.status(200).json(albums);
  });
};

exports.find = (req, res) => {
  Album.findOne({ _id: req.params.artistId }, (err, artist) => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(albums);
    }
  });
};

exports.patch = (req, res) => {
  Album.findById({ _id: req.params.albumId }, (err, album) => {
    if (!album) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      album.set(req.body);
      album.save().then(updatedAlbum => {
        res.status(200).json(updatedAlbum);
      });
    }
  });
};

exports.delete = (req, res) => {
  Album.findByIdAndDelete({ _id: req.params.albumId }, (err, album) => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(204).json({ Message: 'Album was deleted' });
    }
  });
};
