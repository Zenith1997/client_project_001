const db = require("../database/db.js");

const addSlider = async (req, res) => {
    const {title, description, buttonText, buttonLink} = req.body;
    const image = req.file.filename;

    try {
        const q = "INSERT INTO slider (Title, Description, ButtonText, ButtonLink, Image) VALUES (?, ?, ?, ?, ?)";
        const values = [title, description, buttonText, buttonLink, image];
        await executeQuery(q, values);
        return res.status(200).send("Slider added!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const getSliders = async (req, res) => {
    try {
        const q = "SELECT * FROM slider";
        const result = await executeQuery(q);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

const deleteSlider = async (req, res) => {
    const {id} = req.params;

    try {
        const q = "DELETE FROM slider WHERE ID = ?";
        await executeQuery(q, [id]);
        return res.status(200).send("Slider deleted!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}


const executeQuery = (q, values = []) => {
    return new Promise((resolve, reject) => {
        db.query(q, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    addSlider,
    getSliders,
    deleteSlider,
}
