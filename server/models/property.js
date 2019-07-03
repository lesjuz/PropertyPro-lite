import moment from 'moment';
import uuid from 'uuid';


class Property {
  constructor() {
    this.properties = [];
  }

  create(data) {
    const newProperty = {
      id: data.id || uuid.v4(),
      name: data.name,
      status: 'available',
      price: data.price,
      imageUrl: '',
      state: data.state,
      city: data.city,
      address: data.address,
      type: data.type,
      userId: data.userId,
      created_on: moment().format('YYYY-MM-DD HH:mm:ss'),
      modified_on: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  findOne(id) {
    return this.properties.find(reflect => reflect.id === id);
  }

  findAll() {
    return this.properties;
  }

  update(id, data) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties[index].name = data.name || property.name;
    this.properties[index].price = data.price || property.price;
    this.properties[index].state = data.state || property.state;
    this.properties[index].city = data.city || property.city;
    this.properties[index].address = data.address || property.address;
    this.properties[index].type = data.type || property.type;
    this.properties[index].modified_on = moment().format('YYYY-MM-DD HH:mm:ss');
    return this.properties[index];
  }


  deleteOne(id) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties.splice(index, 1);
    return {};
  }
}
export default new Property();
