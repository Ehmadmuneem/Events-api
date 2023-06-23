const eventHandler = require('../controllers/eventController.js');
const express = require('express');

const router = express.Router();

router.route('/').get(eventHandler.getAllEvents).post(eventHandler.createEvent);
router
  .route('/:id')
  .get(eventHandler.getEvent)
  .put(eventHandler.updateEvent)
  .delete(eventHandler.deleteEvent);
module.exports = router;
