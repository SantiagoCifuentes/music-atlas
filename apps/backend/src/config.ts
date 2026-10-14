import "dotenv/config";

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function portFromEnvironment(): number {
  const value = process.env.PORT ?? "3001";
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `PORT must be an integer between 1 and 65535. Received: ${value}`,
    );
  }

  return port;
}

export const config = {
  databaseUrl: requiredEnvironmentVariable("DATABASE_URL"),
  port: portFromEnvironment(),
};
