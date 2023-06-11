<h1> Marketplace is an open source classfields website. </h1>

<h3>Image previews:</h3>

![marketplace-five-alpha vercel app_profile (1)](https://github.com/swapnil233/marketplace/assets/36313876/3448ce43-504a-4aff-9ac0-653d0bc418c0)
![marketplace-five-alpha vercel app_profile (2)](https://github.com/swapnil233/marketplace/assets/36313876/4543b7f8-42c1-46cd-9a5f-7eaa1276dc69)
![marketplace-five-alpha vercel app_ (3)](https://github.com/swapnil233/marketplace/assets/36313876/e7789af7-36f6-4636-9173-e19aa5cd8f05)
![marketplace-five-alpha vercel app_ (4)](https://github.com/swapnil233/marketplace/assets/36313876/99d77578-8efa-45e3-a31c-734684d6acd1)
![marketplace-five-alpha vercel app_profile](https://github.com/swapnil233/marketplace/assets/36313876/554dca3c-3ede-494c-a652-7d6c00ea8ecc)

<h3>Entity relationship diagram</h3>
![ERD](https://github.com/swapnil233/marketplace/assets/36313876/239c6af3-e653-4e5d-b79d-c66278041b17)

#### How to run on your machine:

1. `git clone https://github.com/swapnil233/marketplace.git`
2. `npm install` to get all the dependencies
3. Get an instance of Postgres running and create a database, name it whatever (eg "marketplace").
4. If you want to use Supabase to host the DB instead of your machine, make a DB in Supabase, then go into settings and get the regular connection string and the connection string with PgBouncer. This needs to be done for connection pooling, because if you deploy to a serverless env like Vercel or AWS Amplify, every function invocation may result in a new connection to the database. The connection strings will look like this:

- `DIRECT_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"`
- `DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"`

5. Create a `.env` file, and populate it with the data that's required, which is found in `.env.example`
6. Run `npx prisma generate` and `npx prisma db push` to upload the schema into your DB and generate the TypeScript types for the schema models
7. Seed your database with categories and tags by running `npm run seed`
8. Run `npm run dev` to start the nextjs project on port 3003 (you can change this in `package.json` under the `dev` script)

### Upcoming Features

- [ ] Map view
- [ ] Search by query or query + category
- [ ] Location based results
- [ ] Pagination
- [ ] Dark mode
- [ ] Recommendations algorithm, utilizing something like the Term Frequency-Inverse Document Frequency (TF-IDF) technique with a vector DB + cosine similarity.
