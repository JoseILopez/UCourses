/*
**    COURSE MODEL & SCHEMA
*/

const mongoose = require('mongoose');
const env = require('../../config/env');

const Schema = mongoose.Schema;

// Schema

const courseSchema = new Schema({
  title: String,
  author: String,
  description: String,
  tags: Array,
});

// Static functions

courseSchema.statics.getAll = () => {
  return new Promise((resolve) => {
    const model = mongoose.model('course', courseSchema);

    model.find((err, doc) => {
      if (err) {
        throw err;
      }

      resolve(doc);
    });
  });
};

courseSchema.statics.getCourse = (title) => {
  return new Promise((resolve) => {
    const model = mongoose.model('course', courseSchema);

    model.findOne({ title }, (err, doc) => {
      if (err) {
        throw err;
      }

      if (!doc) {
        resolve(env.HTTP_CODES.NOT_FOUND);
        return;
      }

      resolve(doc);
    });
  });
};

courseSchema.statics.initDB = () => {
  return new Promise((resolve) => {
    const model = mongoose.model('course', courseSchema);

    model.remove({}, (err) => {
      if (err) {
        throw err;
      }

      resolve(env.HTTP_CODES.RESET);
    });
  });
};

courseSchema.statics.modifyCourse = (payload) => {
  return new Promise((resolve) => {
    const model = mongoose.model('course', courseSchema);
    const title = payload.title;
    const author = payload.author;
    const description = payload.description;
    const tags = payload.tags;

    function sendResponse(err, doc) {
      if (err) {
        throw err;
      }

      // If document didn't exist it was created.

      if (!doc) {
        resolve(env.HTTP_CODES.CREATED);
        return;
      }

      resolve(env.HTTP_CODES.OK);
    }

    model.findOneAndUpdate({ title },
                          { $set: {
                            author, description, tags },
                          },
                          { upsert: true },
                          sendResponse);
  });
};

courseSchema.statics.removeCourse = (title) => {
  return new Promise((resolve) => {
    const model = mongoose.model('course', courseSchema);

    model.findOneAndRemove({ title }, (err, doc) => {
      if (err) {
        throw err;
      }

      if (!doc) {
        resolve(env.HTTP_CODES.BAD_REQUEST);
        return;
      }

      resolve(env.HTTP_CODES.OK);
    });
  });
};

courseSchema.statics.tryAddCourse = (data) => {
  return new Promise((resolve) => {
    const Course = mongoose.model('course', courseSchema);

    // Skip creation if the argument is an existing document.

    if (data.id !== undefined) {
      resolve(data);
      return;
    }

    const newCourse = new Course({
      title: data.title,
      author: data.author,
      description: data.description,
      tags: data.tags,
    });

    newCourse.save((err) => {
      if (err) {
        throw err;
      }

      resolve(env.HTTP_CODES.CREATED);
    });
  });
};

courseSchema.statics.validateCourse = (payload) => {
  return new Promise((resolve) => {
    const model = mongoose.model('course', courseSchema);
    const title = payload.title;

    // Check if course exists. If it does return that document
    // If not, return POST payload.

    model.findOne({ title }, (err, doc) => {
      if (err) {
        throw err;
      }

      if (!doc) {
        resolve(payload);
        return;
      }

      console.log('POST :: Course already exists');
      resolve(doc);
    });
  });
};


module.exports = mongoose.model('course', courseSchema);
