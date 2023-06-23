const bcrypt = require("bcryptjs");
const {promisify} = require("util");
const db = require("../database/db.js");

const query = promisify(db.query).bind(db);

exports.register = async (req, res) => {
    const {email, username, password} = req.body;

    if (!email || !username || !password) {
        return res.status(400).send("Please provide an email, username, and password!");
    }

    try {
        const checkUserQuery = "SELECT * FROM users WHERE Email = ? OR Username = ?";
        const checkUserValues = [email, username];
        const result = await query(checkUserQuery, checkUserValues);

        if (result.length > 0) {
            return res.status(409).send("User already exists!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const insertUserQuery = "INSERT INTO users (Email, Username, Password) VALUES (?, ?, ?)";
        const insertUserValues = [email, username, hashPassword];
        await query(insertUserQuery, insertUserValues);

        return res.status(201).send("User registered!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send("Please provide an email and password!");
    }

    try {
        const checkUserQuery = "SELECT * FROM users WHERE Email = ?";
        const checkUserValues = [email];
        const result = await query(checkUserQuery, checkUserValues);

        if (result.length === 0) {
            return res.status(401).send("Invalid credentials!");
        }

        const user = result[0];
        const bcryptResult = await bcrypt.compare(password, user.Password);

        if (!bcryptResult) {
            return res.status(401).send("Invalid credentials!");
        }

        const userData = {...user};
        delete userData.Password;

        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    }).status(200).send("User logged out!");
};
