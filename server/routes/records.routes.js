const router = require("express").Router();
const pool = require("../db/sdg.db.js");

router.post("/records-values", async (req, res) => {
    try {
        const { question_id, selectedYear, selectedSdg, user_id } = req.body;

        if (!selectedYear || !selectedSdg || !question_id) {
            return res.status(400).json({
                message: "Question ID, Year, and SDG must be provided",
            });
        }

        // Query to get record values based on question_id, selectedYear, and selectedSdg
        const result = await pool.query(
            `SELECT rv.*
             FROM records_values rv
             INNER JOIN records r ON rv.record_id = r.record_id
             WHERE rv.question_id = $1 AND r.sdg_id = $2 AND EXTRACT(YEAR FROM r.date_submitted) = $3 AND r.user_id = $4`,
            [question_id, selectedSdg, selectedYear, user_id]
        );

        // Check if values were found
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ message: "No values found for the given criteria" });
        }

        // Format the response data before sending
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/records-values/check", async (req, res) => {
    try {
        const { selectedYear, selectedSdg, user_id } = req.body;

        if (!selectedYear || !selectedSdg || !user_id) {
            return res.status(400).json({
                message: "Year, SDG, and User ID must be provided",
            });
        }

        // Query to get record values based on user_id, selectedYear, and selectedSdg
        const result = await pool.query(
            `SELECT r.record_id
             FROM records r
             WHERE r.sdg_id = $1 AND EXTRACT(YEAR FROM r.date_submitted) = $2 AND r.user_id = $3`,
            [selectedSdg, selectedYear, user_id]
        );

        // Check if a record was found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No records found" });
        }

        // Return the record_id
        res.json({ record_id: result.rows[0].record_id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/add/records", async (req, res) => {
    try {
        const { user_id, status, selected_sdg } = req.body;

        console.log(req.body);

        // Default status to 'To be reviewed' if not provided
        const recordStatus = status || 1;

        // Generate a unique record ID REC + 1000000 to 9999999
        const record_id = `REC${Math.floor(Math.random() * 9000000) + 1000000}`;

        // Insert the new record into the database
        const newRecord = await pool.query(
            "INSERT INTO records (record_id, user_id, status, date_submitted, sdg_id) VALUES ($1, $2, $3, current_timestamp, $4) RETURNING *",
            [record_id, user_id, recordStatus, selected_sdg]
        );

        res.status(201).json(newRecord.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/add/answers", async (req, res) => {
    const { record_value_id, value, question_id, record_id } = req.body;

    try {
        // Check if all required fields are provided
        if (!record_value_id || !value || !question_id || !record_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Insert data into the table
        const query = `
            INSERT INTO records_values (record_value_id, value, question_id, record_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [record_value_id, value, question_id, record_id];
        const result = await pool.query(query, values);

        // Return the inserted row
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route: GET /api/get/record/:year/:sdg
router.get("/get/record/:year/:sdg", async (req, res) => {
    const { year, sdg } = req.params;

    try {
        // Replace with your actual query to fetch record based on year and SDG
        const record = await pool.query(
            "SELECT * FROM records WHERE EXTRACT(YEAR FROM date_submitted) = $1 AND sdg_id = $2",

            [year, sdg]
        );

        if (record.rows.length > 0) {
            res.json(record.rows[0]); // Return the first record if multiple records exist
        } else {
            res.status(404).json({ message: "No record found" });
        }
    } catch (error) {
        console.error("Error fetching record:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//
router.put("/update/answers", async (req, res) => {
    const { record_value_id, value, question_id, record_id } = req.body;

    try {
        const query = `
            UPDATE records_values
            SET value = $1
            WHERE record_value_id = $2 AND question_id = $3 AND record_id = $4
            RETURNING *;
        `;
        const values = [value, record_value_id, question_id, record_id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Record not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
