import { CustomerField } from "./definitions";
import { Pool } from "pg";
import { unstable_noStore as noStore } from "next/cache";

const pool = new Pool({
    connectionString: "postgresql://postgres@localhost:5432/sharper_point",
});

export async function fetchCustomers() {
    try {
        console.log("fetching");
        const client = await pool.connect();
        const query = `
            SELECT
                id,
                name
            FROM customers
            ORDER BY name ASC
        `;
        const { rows } = await client.query(query);
        client.release(); // Don't forget to release the client back to the pool when done
        return rows;
    } catch (err) {
        console.error("Database Error:", err);
        throw new Error("Failed to fetch all customers.");
    }
}
