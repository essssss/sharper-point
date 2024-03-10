const { db } = require("@vercel/postgres");
const {
    customers,
    services,
    providers,
    appointments,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedProviders(client) {
    try {
        // Create the "providers" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS providers (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

        console.log(`Created "providers" table`);

        // Insert data into the "providers" table
        const insertedProviders = await Promise.all(
            providers.map(async (provider) => {
                const hashedPassword = await bcrypt.hash(provider.password, 10);
                return client.sql`
        INSERT INTO providers (id, name, email, password)
        VALUES (${provider.id}, ${provider.name}, ${provider.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
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
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

        console.log(`Created "customers" table`);

        // Insert data into the "customers" table
        const insertedCustomers = await Promise.all(
            customers.map(
                (customer) => client.sql`
        INSERT INTO customers (id, name, email)
        VALUES (${customer.id}, ${customer.name}, ${customer.email})
        ON CONFLICT (id) DO NOTHING;
      `
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
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS services (
        title VARCHAR(255) NOT NULL PRIMARY KEY,
        cost INTEGER NOT NULL        
      );
    `;

        console.log(`Created "services" table`);

        // Insert data into "services" table
        const insertedServices = await Promise.all(
            services.map(
                async (service) =>
                    client.sql`
				INSERT INTO services (title, cost)
				VALUES ( ${service.title}, ${service.cost})
				ON CONFLICT (title) DO NOTHING;
				`
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
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "appointments" table if it doesn't exist
        const createAppointmentsTable = await client.sql`
			CREATE TABLE IF NOT EXISTS appointments (
				id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
				customer_id UUID REFERENCES customers(id),
				service_id UUID REFERENCES services(id),
				provider_id UUID REFERENCES users(id),
				appointment_datetime TIMESTAMP NOT NULL,
				status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'canceled'))
			);
		
        `;

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
    const client = await db.connect();

    await seedProviders(client);
    await seedCustomers(client);
    await seedServices(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        "An error occurred while attempting to seed the database:",
        err
    );
});
