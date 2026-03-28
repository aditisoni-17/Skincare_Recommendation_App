import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const PORT = 27017;
const DB_NAME = 'noorify';
let mongoServer;

async function start() {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      ip: '127.0.0.1',
      port: PORT,
      dbName: DB_NAME,
    },
  });

  const uri = mongoServer.getUri(DB_NAME);

  console.log('In-memory MongoDB ready', {
    uri,
    note: 'Keep this process running while using the app locally.',
  });
}

async function shutdown(signal) {
  if (mongoServer) {
    await mongoServer.stop();
  }

  console.log(`In-memory MongoDB stopped (${signal})`);
  process.exit(0);
}

start().catch((err) => {
  console.error('Failed to start in-memory MongoDB', {
    message: err?.message,
    stack: err?.stack,
  });
  process.exit(1);
});

process.on('SIGINT', () => {
  shutdown('SIGINT').catch(() => process.exit(1));
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM').catch(() => process.exit(1));
});
