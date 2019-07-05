/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('User should be able to create an account ', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'test',
        last_name: 'tester',
        phone: '0785560312',
        address: 'kigali',
        email: 'tester@gmail.com',
        password: 'test57',
      })
      .end((err) => {
        done(err);
      });
  });
  it('Should return error if email has been already  assigned to an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        first_name: 'test2',
        last_name: 'tester2',
        phone: '0785560012',
        address: 'new york',
        email: 'tester@gmail.com',
        password: 'hello00',
      })
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });
  it('Should login a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'tester@gmail.com',
        password: 'test57',
      })
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  });

  it('Should return error if email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'tester@gmail.c',
        password: 'test57',
      })
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });

  it('Should return error if password is incorrect', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'tester@gmail.com',
        password: 'test',
      })
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  });
});

describe('Property', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/properties')
      .send({
        id: '1',
        name: 'name1',
        price: 1500,
        state: 'kigali',
        city: 'kigali',
        address: 'kn12st',
        type: '1bedroom 2min flat',
        userId: '1ac2',
      },
      {
        id: '2',
        name: 'name2',
        price: 1500,
        state: 'kigali',
        city: 'kigali',
        address: 'kn15st',
        type: '1bedroom 2min flat',
        userId: '1ac2',
      })
      .end((err) => {
        done(err);
      });
  });
  describe('POST /property', () => {
    it('should save a new proprty', (done) => {
      chai
        .request(app)
        .post('/api/v1/properties')
        .send(
          {
            name: 'house',
            price: 1500,
            state: 'kigali',
            city: 'kigali',
            address: 'kabeza',
            type: '1bedroom 2min flat',
            userId: '1we43j',
          },
        )
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
  describe('GET /', () => {
    // Test to get all properties record
    it('should get all properties', (done) => {
      chai.request(app)
        .get('/api/v1/properties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    // Test to get single property record
    it('should get a single property record', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/properties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // Test to get single property record
    it('should return error if property id is incorrect', (done) => {
      const id = 5;
      chai.request(app)
        .get(`/api/v1/properties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('PUT /properties/:id', () => {
    it('should update a property', (done) => {
      const id = 1;
      chai.request(app)
        .put(`/api/v1/properties/${id}`)
        .send({
          name: 'updated house',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('returns status 404 when id is not found', (done) => {
      const id = 12;
      chai.request(app)
        .put(`/api/v1/properties/${id}`)
        .send({
          name: 'updated house',
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('DELETE /properties/:id', () => {
    it('should remove a property', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/properties/${id}`)
        .end((_err, res) => {
          res.should.have.status(204);
          done();
        });
    });
    it('returns status 404 when id is not found', (done) => {
      const id = 12;
      chai.request(app)
        .delete(`/api/v1/properties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
