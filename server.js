const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.')); // מאפשר להריץ את ה-HTML מאותה תיקייה

app.post('/save-report', (req, res) => {
    const newData = req.body;
    const filePath = path.join(__dirname, 'database.json');

    // קריאת הקובץ הקיים, הוספת הנתונים החדשים ושמירה
    fs.readFile(filePath, 'utf8', (err, data) => {
        let json = [];
        if (!err && data) {
            try { json = JSON.parse(data); } catch (e) { json = []; }
        }
        json.push(newData);

        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) return res.status(500).send({ success: false });
            res.send({ success: true, message: "הדיווח נשמר בתיקייה בקובץ database.json" });
        });
    });
});

app.listen(3000, () => console.log('השרת פועל בכתובת: http://localhost:3000'));
