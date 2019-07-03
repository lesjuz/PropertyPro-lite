import moment from 'moment';
import uuid from 'uuid';
import bcrypt from 'bcrypt';


class User {
  constructor() {
    this.users = [];
  }

  signUp(data) {
    const hash = bcrypt.hashSync(data.password, 10);
    const user = {
      id: uuid.v4(),
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      address: data.address,
      email: data.email,
      password: hash,
      created_on: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    this.users.push(user);
    return user;
  }

  findOne(email) {
    return this.users.find(reflect => reflect.email === email);
  }
}

export default new User();
