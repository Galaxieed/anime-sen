import express from "express";
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3301;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Saitama111001!',
  database: 'anime_sen'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


app.use(express.json());


app.get('/list/get', (req, res) => {
  const list_type = req.query.list_type;

  let q = 'SELECT * FROM anime_list WHERE list_type = ?';
  db.query(q, [list_type], (err, result) => {
    if (err) throw err;
    res.json(result);
  })
})

app.post('/list/add', (req, res) => {
  const { mal_id, title, image_url, mal_url, list_type } = req.body;
  const q = 'INSERT INTO anime_list (mal_id, title, image_url, mal_url, list_type) VALUES (?, ?, ?, ?, ?)';
  db.query(q, [mal_id, title, image_url, mal_url, list_type], (err) => {
    if (err) {
      console.error('Query error inserting data: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ success: true });
  })
})

app.post('/list/update', (req, res) => {
  const { mal_id } = req.body;
  const q = 'UPDATE anime_list SET list_type = ? WHERE mal_id = ?';
  db.query(q, ['watched', mal_id], (err, result) => {
    if (err) {
      console.error('Query error updating data: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ success: true });
  })
})

app.delete('/list/delete', (req, res) => {
  const { mal_id } = req.body;
  console.log(typeof mal_id);
  const q = 'DELETE FROM anime_list WHERE mal_id = ?';
  db.query(q, [mal_id], (err) => {
    if (err) {
      console.error('Query error deleting data: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ success: true })
  })
})


app.listen(port, () => {
  console.log('Server is running on port: ' + port);
})
