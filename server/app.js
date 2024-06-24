import express from 'express';
import cors from 'cors';
import { checkConnection } from './db_config.js';

const app = express();
const PORT = 5000;

const connection = checkConnection();

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Default route
app.get('/', (req, res) => {
  res.send('The server is running on PORT 5000');
});

// Route for "/user/get-all"
app.get('/users/get-all', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Route for "login"
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username=? AND password=? LIMIT 1';

  connection.query(query, [username, password], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      res.json(true)
    } else {
      res.json(false);
    }
  });
});

// Route for "/products/get-info/:product_id"
app.get('/products/get-info/:product_id', (req, res) => {
  const product_id = req.params.product_id;
  res.send(`This is a sample product info route for ${product_id}`);
});

// Route for "/products/get-all"
app.get('/products/get-all', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Route for "/products/get-by-id"
app.get('/products/get-by-id/:product_id', (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM products WHERE product_id = ?';
  connection.query(query, [product_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Route for "/products/update-by-id"
app.post('/products/update-by-id/:product_id', (req, res) => {
  const { product_id } = req.params;
  const { product_name, quantity, unit, price } = req.body;

  const query = `UPDATE products SET product_name = ?, quantity = ?, unit = ?, price = ? WHERE product_id = ?`;
  connection.query(query, [product_name, quantity, unit, price, product_id], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

// Route for "/products/delete-by-id"
app.post('/products/delete-by-id', (req, res) => {
  const { product_id } = req.body;

  const query = `DELETE FROM products WHERE product_id = ?`;
  connection.query(query, [product_id], (error, results, rows) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

// Route for "/products/add-product"
app.post('/products/add-product', async (req, res) => {
  const { product_id, product_name, quantity, unit, price } = req.body;

  try {
    const checkquery = 'SELECT * FROM products WHERE product_id =? OR product_name =?';
    connection.query(checkquery, [product_id, product_name], (error, results, rows) => {

      if (results.length > 0) {
        res.json({ exist: true, success: false });
        return;
      } else {
        const query = 'INSERT INTO products (product_id, product_name, quantity, unit, price) VALUES (?,?,?,?,?)';
        connection.query(query, [product_id, product_name, quantity, unit, price], (error, results, rows) => {

          res.json({ exist: false, success: true });

        });
      }
    });

  } catch (error) {
    console.error('Error executing query:', error);
    res.json({ exist: false, success: false });
  }
});