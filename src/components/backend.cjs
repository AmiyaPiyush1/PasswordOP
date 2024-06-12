const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const mongourl = "mongodb://localhost:27017/data";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mongoose schema and model
const userSchema = new mongoose.Schema({
    Email: { type: String, unique: true,index:true },
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// MongoDB connection
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/signup", async (req, res) => {
    try {
        const existingUser = await User.findOne({ Email: req.body.Email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const newUser = new User({
            Email: req.body.Email,
            username: req.body.username,
            password: req.body.password
        });

        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(400).json({ error: err.message });
    }
});
app.post("/login", async (req, res) => {
    const { Email, password } = req.body;
    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        if (password !== user.password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

       
        res.status(200).json({ message: 'Login successful', user });
        
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
