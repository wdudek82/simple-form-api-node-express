const fs = require('fs');
const path = require('path');

const filePath = path.resolve('data', 'forms-data.json');

function getFormsData() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);

      return resolve(JSON.parse(data));
    });
  });
}

module.exports.getForms = (req, res, next) => {
  getFormsData()
    .then((data) => {
      return res.status(200).json({
        message: 'Successfully fetched forms data.',
        forms: data,
      });
    })
    .catch(console.log);
};

module.exports.getForm = (req, res, next) => {
  const { id } = req.params;

  getFormsData()
    .then((data) => {
      const form = JSON.parse(data).find((item) => item.id === id);

      if (!form) {
        return res
          .status(404)
          .json({ message: `Could not find form with id ${id}` });
      }

      return res.status(200).json({ message: `Form with ${id} found!`, form });
    })
    .catch(console.log);
};

module.exports.saveForm = (req, res, next) => {
  const form = req.body;

  getFormsData()
    .then((data) => {
      console.log(form);

      const updatedData = [...data, form];

      fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
        if (err) console.log(err);

        res.status(201).json({ message: 'Form saved!', form });
      });
    })
    .catch(console.log);
};
