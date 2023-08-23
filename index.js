const express = require('express');
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
const url = process.env.BASE_URL || `http://localhost:${port}`;
app.listen(port, console.log(`Servidor activo en puerto ${port}`));

app.get('/', async (req, res) => {
    res.send('test');
});