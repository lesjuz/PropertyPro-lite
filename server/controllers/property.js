
import PropertyModel from '../models/property';

const Property = {
  create(req, res) {
    const property = PropertyModel.create(req.body);
    return res.status(201).send(property);
  },

  getAll(req, res) {
    const properties = PropertyModel.findAll();
    return res.status(200).send(properties);
  },

  getOne(req, res) {
    const property = PropertyModel.findOne(req.params.id);
    if (!property) {
      return res.status(404).send({ message: 'property not found' });
    }
    return res.status(200).send(property);
  },

  update(req, res) {
    const property = PropertyModel.findOne(req.params.id);
    if (!property) {
      return res.status(404).send({ message: 'property not found' });
    }
    const updatedReflection = PropertyModel.update(req.params.id, req.body);
    return res.status(200).send(updatedReflection);
  },

  delete(req, res) {
    const property = PropertyModel.findOne(req.params.id);
    if (!property) {
      return res.status(404).send({ message: 'property not found' });
    }
    const ref = PropertyModel.deleteOne(req.params.id);
    return res.status(204).send(ref);
  },
};

export default Property;
