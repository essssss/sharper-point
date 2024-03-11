const { Client } = require("pg");
const {
    customers,
    services,
    providers,
    appointments,
} = require("./placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedProviders(client) {
    try {
        // Create the "providers" table if it doesn't exist
        const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS providers (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

        console.log(`Created "providers" table`);
        console.log(providers);
        // Insert data into the "providers" table
        const insertedProviders = await Promise.all(
            providers.map(async (provider) => {
                const hashedPassword = await bcrypt.hash(provider.password, 10);
                console.log(hashedPassword);
                return client.query(
                    `
        INSERT INTO providers (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `,
                    [provider.id, provider.name, provider.email, hashedPassword]
                );
            })
        );

        console.log(`Seeded ${insertedProviders.length} providers`);

        return {
            createTable,
            providers: insertedProviders,
        };
    } catch (error) {
        console.error("Error seeding providers:", error);
        throw error;
    }
}

async function seedCustomers(client) {
    try {
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        // Create the "customers" table if it doesn't exist
        const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `);

        console.log(`Created "customers" table`);

        // Insert data into the "customers" table
        const insertedCustomers = await Promise.all(
            customers.map((customer) =>
                client.query(
                    `
        INSERT INTO customers (id, name, email)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO NOTHING;
      `,
                    [customer.id, customer.name, customer.email]
                )
            )
        );

        console.log(`Seeded ${insertedCustomers.length} customers`);

        return {
            createTable,
            customers: insertedCustomers,
        };
    } catch (error) {
        console.error("Error seeding customers:", error);
        throw error;
    }
}

async function seedServices(client) {
    try {
        // Create the "services" table if it doesn't exist
        const createTable = await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        title VARCHAR(255) NOT NULL PRIMARY KEY,
        cost INTEGER NOT NULL        
      );
    `);

        console.log(`Created "services" table`);

        // Insert data into "services" table
        const insertedServices = await Promise.all(
            services.map(async (service) =>
                client.query(
                    `
				INSERT INTO services (title, cost)
				VALUES ($1, $2)
				ON CONFLICT (title) DO NOTHING;
				`,
                    [service.title, service.cost]
                )
            )
        );

        console.log(`Seeded ${insertedServices.length} services`);

        return {
            createTable,
            services: insertedServices,
        };
    } catch (error) {
        console.error("Error seeding Services, error");
        throw error;
    }
}

async function seedAppointments(client) {
    try {
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        // Create the "appointments" table if it doesn't exist
        const createAppointmentsTable = await client.query(`
			CREATE TABLE IF NOT EXISTS appointments (
				id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
				customer_id UUID REFERENCES customers(id),
				service_id UUID REFERENCES services(id),
				provider_id UUID REFERENCES users(id),
				appointment_date DATE NOT NULL,
				appointment_time TIME NOT NULL,
				status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'canceled'))
			);
		
        `);

        console.log(`Created "appointments" table`);

        // Insert data into "appointments" table

        return {
            createTable,
        };
    } catch (error) {
        console.error("Error seeding appointments:", error);
        throw error;
    }
}

async function main() {
    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "sharper_point",
        port: 5432,
    });

    await client.connect();

    try {
        await seedProviders(client);
        await seedCustomers(client);
        await seedServices(client);
    } catch (error) {
        console.error("An error occurred while seeding the database:", error);
    } finally {
        await client.end();
    }
}

main();
