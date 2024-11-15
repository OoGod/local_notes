const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { marked } = require('marked'); // 引入 marked
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 读取记事本内容
app.get('/notes', (req, res) => {
    fs.readFile('notes.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading notes');
        }
        res.send(data);
    });
});

// 保存记事本内容
app.post('/notes', (req, res) => {
    const notes = req.body.notes;
    fs.writeFile('notes.txt', notes, (err) => {
        if (err) {
            return res.status(500).send('Error saving notes');
        }
        res.send('Notes saved');
    });
});

// 渲染 Markdown
app.get('/render', (req, res) => {
    fs.readFile('notes.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading notes');
        }
        const html = marked(data); // 将 Markdown 转换为 HTML
        res.send(html);
    });
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
