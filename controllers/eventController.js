const dbConnect = require('../dbServer');
const AppError = require('../utils/appError.js');
const ObjectId = require('mongodb').ObjectId;

//GETTING ALL THE EVENTS API
exports.getAllEvents = async function (req, res, next) {
  try {
    //FILTERING

    let queryObj = { ...req.query };
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    // Convert integer values to numbers
    for (let key in queryObj) {
      if (!isNaN(queryObj[key])) {
        queryObj[key] = Number(queryObj[key]);
      }
    }

    //ADVANCE FILTERING

    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // let queryString = JSON.parse(queryObj);
    // const newQuery = queryString;
    // console.log(newQuery);

    // const fieldName = Object.keys(newQuery)[0];
    // console.log(Object.keys(newQuery));
    // console.log(fieldName);
    // const operator = Object.keys(newQuery[fieldName])[0];
    // console.log(operator);
    // const value = newQuery[fieldName][operator];
    // console.log(value);

    // const mongodbQuery = {};
    // mongodbQuery[fieldName] = {};
    // mongodbQuery[fieldName][operator] = parseInt(value);

    let event = await dbConnect();
    let query = event.find(queryObj);

    // SORTING
    if (req.query.sort) {
      let sortQuery = {};
      sortQuery[req.query.sort] = 1; // Assuming sorting in ascending order
      query = query.sort(sortQuery);
    }

    // FIELD LIMITING
    if (req.query.fields) {
      let fieldQuery = req.query.fields.split(',').reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {});
      query = query.project(fieldQuery);
    }

    //PAGINATE
    const page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 10;
    //limit[key] = Number(limit[key]);

    let skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    let result = await query.toArray();

    if (result.length == 0) {
      const err = new AppError(
        `Something went wrong or no events found: ${req.originalUrl}`,
        404
      );
      next(err);
    }

    res.status(200).json({
      status: 'success',
      TotalEvents: result.length,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//POSTING AN EVENT API
exports.createEvent = async function (req, res, next) {
  try {
    let event = await dbConnect();
    const data = req.body;
    await event.insertOne(data);
    res.status(200).json({
      status: 'success',
      message: `Event successfully created`,
      Event: req.body,
    });
  } catch (err) {
    next(err);
  }
};

//GET A SINGLE EVENT API
exports.getEvent = async function (req, res, next) {
  try {
    let event = await dbConnect();

    let id = new ObjectId(req.params.id);

    let result = await event.findOne({ _id: id });

    if (!result) {
      const error = new AppError(
        `Please check the id of the event that you want: ${req.params.id}`,
        404
      );
      next(error);
    } else {
      res.status(200).json({ status: 'Success', Event: result });
    }
  } catch (err) {
    next(err);
  }
};

//UPDATING EVENT API
exports.updateEvent = async function (req, res, next) {
  try {
    let event = await dbConnect();

    const id = new ObjectId(req.params.id);
    const result = await event.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );

    if (result.value == null) {
      const error = new AppError(
        `Please check the id of the event you want to update: ${req.params.id}`,
        404
      );
      next(error);
    } else {
      res.status(200).json({
        status: 'OK',
        message: 'Document Updated successfully:',
        event: req.body,
      });
    }
  } catch (err) {
    next(err);
  }
};

//Delete an event api
exports.deleteEvent = async function (req, res, next) {
  try {
    const event = await dbConnect();
    const id = new ObjectId(req.params.id);
    const result = await event.findOneAndDelete({ _id: id });

    if (result.value == null) {
      const error = new AppError(
        `Please check the id of the event you want to delete: ${req.params.id}`,
        404
      );
      next(error);
    } else {
      res.status(200).json({
        status: success,
        message: `Successfully deleted the event: ${result}`,
      });
    }
  } catch (err) {
    next(err);
  }
};
