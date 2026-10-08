const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/submit", async (req, res) => {
    const { itemName, itemDescription } = req.body;

    try {
        const response = await fetch("http://backend:5000/submittodoitem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemName: itemName,
                itemDescription: itemDescription
            })
        });

        const result = await response.json();

        res.send(`
            <h2>${result.message}</h2>
            <p>Item Name: ${itemName}</p>
            <p>Item Description: ${itemDescription}</p>
            <br>
            <a href="/">Go Back</a>
        `);

    } catch (error) {
        console.error("Backend connection error:", error);
        res.status(500).send("Backend connection failed");
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
});