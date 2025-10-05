const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('.'));

app.listen(3001, () => {
    console.log('Test server running on port 3001');
});