import { MongoClient } from 'mongodb';
import 'https://deno.land/std@0.224.0/dotenv/load.ts';

const uri = Deno.env.get('MONGODB_URI');
if (!uri) throw new Error('MONGODB_URI não definida no .env');

const client = new MongoClient(uri);
await client.connect();

export const db = client.db('KeyCript');
