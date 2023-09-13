const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const request = require('supertest');
const { expect } = require('chai');

const app = express();
app.use(bodyParser.json());

const db = new sqlite3.Database('mydatabase.db');

db.run(`
  CREATE TABLE IF NOT EXISTS persons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
  )
`);

// Define your API routes as in the provided code
app.post('/api', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  const insertQuery = 'INSERT INTO persons (name, age) VALUES (?, ?)';
  const insertValues = [name, age];

  db.run(insertQuery, insertValues, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const newPerson = {
      id: this.lastID,
      name,
      age,
    };

    res.status(201).json(newPerson);
  });
});

app.get('/api/:id', (req, res) => {
  const { id } = req.params;

  const readQuery = 'SELECT * FROM persons WHERE id = ?';

  db.get(readQuery, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json(row);
  });
});

app.put('/api/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }

  const updateQuery = 'UPDATE persons SET name = ?, age = ? WHERE id = ?';
  const updateValues = [name, age, id];

  db.run(updateQuery, updateValues, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({ message: 'Person updated successfully' });
  });
});

app.delete('/api/:id', (req, res) => {
  const { id } = req.params;

  const deleteQuery = 'DELETE FROM persons WHERE id = ?';

  db.run(deleteQuery, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted successfully' });
  });
});

app.post('/api/:name', (req, res) => {
  const { name } = req.params;
  const { age } = req.body;

  // Validate that age is provided
  if (!age) {
    return res.status(400).json({ error: 'Age is required for creating a person' });
  }

  // Check if the person with the provided name already exists
  db.get('SELECT * FROM persons WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (row) {
      return res.status(409).json({ error: 'Person with the same name already exists' });
    }

    // Insert a new person with the provided name and age
    db.run('INSERT INTO persons (name, age) VALUES (?, ?)', [name, age], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const newPerson = {
        id: this.lastID,
        name,
        age,
      };

      res.status(201).json(newPerson);
    });
  });
});

app.get('/api/name/:name', (req, res) => {
  const { name } = req.params;

  // Retrieve person details based on the provided name
  db.get('SELECT * FROM persons WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json(row);
  });
});

app.put('/api/name/:name', (req, res) => {
  const { name } = req.params;
  const { age } = req.body;

  // Validate that age is provided
  if (!age) {
    return res.status(400).json({ error: 'Age is required for the update' });
  }

  // Perform an update operation based on the provided name
  db.run('UPDATE persons SET age = ? WHERE name = ?', [age, name], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({ message: 'Person updated successfully' });
  });
});

app.delete('/api/name/:name', (req, res) => {
  const { name } = req.params;

  // Delete the person based on the provided name
  db.run('DELETE FROM persons WHERE name = ?', [name], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted successfully' });
  });
});

// Import the Express app and set it up for testing with supertest
const server = app.listen(0);

describe('API Tests', () => {
  after((done) => {
    // Close the server and the database connection after tests
    server.close(() => {
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        done();
      });
    });
  });

  it('should create a new person', (done) => {
    const newPerson = { name: 'John Doe', age: 30 };

    request(server)
      .post('/api')
      .send(newPerson)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(newPerson.name);
        expect(res.body.age).to.equal(newPerson.age);
        done();
      });
  });

  it('should read a person by ID', (done) => {
    // Make a request to read a person by ID and assert the response
    request(server)
      .get('/api/1') // Replace with a valid person ID
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('age');
        done();
      });
  });

  it('should update a person by ID', (done) => {
    const updatedPerson = { name: 'Updated Name', age: 40 };

    // Make a request to update a person by ID and assert the response
    request(server)
      .put('/api/1') // Replace with a valid person ID
      .send(updatedPerson)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body.message).to.equal('Person updated successfully');
        done();
      });
  });

  it('should delete a person by ID', (done) => {
    // Make a request to delete a person by ID and assert the response
    request(server)
      .delete('/api/1') // Replace with a valid person ID
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body.message).to.equal('Person deleted successfully');
        done();
      });
  });

  it('should read a person by name', (done) => {
    // Make a request to read a person by name and assert the response
    request(server)
      .get('/api/name/John Doe') // Replace with a valid person name
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('age');
        done();
      });
  });

  it('should update a person by name', (done) => {
    const updatedPerson = { age: 50 };

    // Make a request to update a person by name and assert the response
    request(server)
      .put('/api/name/John Doe') // Replace with a valid person name
      .send(updatedPerson)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body.message).to.equal('Person updated successfully');
        done();
      });
  });

  it('should delete a person by name', (done) => {
    // Make a request to delete a person by name and assert the response
    request(server)
      .delete('/api/name/John Doe') // Replace with a valid person name
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res.body.message).to.equal('Person deleted successfully');
        done();
      });
  });

  // Add more test cases for other CRUD operations here
});
