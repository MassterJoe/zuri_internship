const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

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

app.post('/api', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: 'Both name and age are required' });
    }
  
    const insertQuery = 'INSERT INTO persons (name, age) VALUES (?, ?)';
    const insertValues = [name, age];
  
    db.run(insertQuery, insertValues, function(err) {
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
  
// Read a specific person by ID
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
  
  // Update a specific person by ID
  app.put('/api/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
  
    if (!name || !age) {
      return res.status(400).json({ error: 'Both name and age are required' });
    }
  
    const updateQuery = 'UPDATE persons SET name = ?, age = ? WHERE id = ?';
    const updateValues = [name, age, id];
  
    db.run(updateQuery, updateValues, function(err) {
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


  // Delete a specific person by ID
  app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
  
    const deleteQuery = 'DELETE FROM persons WHERE id = ?';
  
    db.run(deleteQuery, [id], function(err) {
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

  // Create a new person by name
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
        db.run('INSERT INTO persons (name, age) VALUES (?, ?)', [name, age], function(err) {
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


// Retrieve person details by name
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

// Update person details by name
app.put('/api/name/:name', (req, res) => {
    const { name } = req.params;
    const { age } = req.body;

    // Validate that age is provided
    if (!age) {
        return res.status(400).json({ error: 'Age is required for the update' });
    }

    // Perform an update operation based on the provided name
    db.run('UPDATE persons SET age = ? WHERE name = ?', [age, name], function(err) {
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

// Delete a person by name
app.delete('/api/name/:name', (req, res) => {
    const { name } = req.params;

    // Delete the person based on the provided name
    db.run('DELETE FROM persons WHERE name = ?', [name], function(err) {
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





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

