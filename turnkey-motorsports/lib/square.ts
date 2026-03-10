// @ts-expect-error — square v44 ships without .d.ts files
import { SquareClient, SquareEnvironment } from 'square';

const squareEnvironment: string =
  process.env.SQUARE_ENVIRONMENT === 'production'
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: squareEnvironment,
}) as SquarePaymentsClient;

// Minimal type surface for what we use from the Square v44 SDK
export interface SquarePaymentsClient {
  payments: {
    create: (request: CreatePaymentInput) => Promise<CreatePaymentOutput>;
  };
}

interface MoneyAmount {
  amount: bigint;
  currency: string;
}

export interface CreatePaymentInput {
  sourceId: string;
  idempotencyKey: string;
  amountMoney: MoneyAmount;
  buyerEmailAddress?: string;
  note?: string;
}

interface PaymentResult {
  id?: string;
  status?: string;
}

interface CreatePaymentOutput {
  data: {
    payment?: PaymentResult;
    errors?: Array<{ code?: string; detail?: string; category?: string }>;
  };
}

export interface SquareApiError {
  statusCode?: number;
  errors?: Array<{ code?: string; detail?: string; category?: string }>;
}

export function isSquareError(err: unknown): err is SquareApiError {
  return (
    err !== null &&
    typeof err === 'object' &&
    'errors' in err &&
    Array.isArray((err as SquareApiError).errors)
  );
}
