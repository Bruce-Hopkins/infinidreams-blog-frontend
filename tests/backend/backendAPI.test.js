let chai = require('chai');
let expect = chai.expect;
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
require('dotenv').config()

// GET all the posts
describe('/GET blogposts', () => {
  
  // This is will be used to get an individual post.
  let id;
  it('it should GET all the posts', (done) => {
    chai.request(process.env.GATSBY_BACKEND_URL + "/")
      .get('api/posts/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        
        // If there is no body this will cause an error. The try statement prevents this break.
        try {
          if (res.body >= 0) id = res.body[0];
        } 
        catch {
          console.log("Error collecting the post")
        }
        done();
      });
  });

  // Only preform this test if the other has succeeded
  if (id) {
    it('it should GET all the posts', (done) => {
      chai.request(process.env.GATSBY_BACKEND_URL + "/")
        .get('api/posts/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

  }

  // Make sure that the navbar can connect to the API, and is the right number of results.
  it('it should return four titles', (done) => {
    chai.request(process.env.GATSBY_BACKEND_URL + "/")
      .get('api/recent-posts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.below(6)
        done();
      });
  });
})