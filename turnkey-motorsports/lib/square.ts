import { SquareClient, SquareEnvironment } from 'square';

const squareEnvironment =
  process.env.SQUARE_ENVIRONMENT === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: squareEnvironment,
});

export function isSquareError(
  err: unknown
): err is { statusCode?: number; errors?: Array<{ code?: string; detail?: string; category?: string }> } {
  return (
    err !== null &&
    typeof err === 'object' &&
    'errors' in err &&
    Array.isArray((err as { errors?: unknown }).errors)
  );
}
