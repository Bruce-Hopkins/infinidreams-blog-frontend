let chai = require('chai');
let expect = chai.expect;
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);


// TODO, Add tests to confirm API connection
// GET all the posts
describe('/GET blogposts', () => {
  it('it should connect to the API', (done) => {
    chai.request("http://localhost:5000/")
    .get('api/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  })
  
  // This is will be used to get an individual post.
  let id;
  it('it should GET all the posts', (done) => {
    chai.request("http://localhost:5000/")
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
      chai.request("http://localhost:5000/")
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
    chai.request("http://localhost:5000/")
      .get('api/recent-posts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.below(6)
        done();
      });
  });
})