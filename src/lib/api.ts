import { NextResponse } from "next/server";

import { ZodError, infer as ZodInfer, ZodType } from "zod";
import { fromZodError } from "zod-validation-error";
import { db } from "./db";
import { jobs } from "@/schema";
type Config<Context> = {
  createContext(): Context;
};

type ProcedureFn<Context, Result, T, U> = (_data: {
  req: Request;
  res: typeof NextResponse;
  ctx: Context;
  input: { query: InferSchema<T>; body: InferSchema<U> };
}) => Result;

interface TErroredAPIResponse {
  success: false;
  data: null;
  message: string;
}

interface TSuccessAPIResponse<T> {
  success: true;
  data: T;
  message: null;
}

export type InferApiRoute<U extends (..._args: any) => any> = Awaited<
  ReturnType<U>
> extends NextResponse<infer T>
  ? T
  : never;

type APIResponse<T> = TSuccessAPIResponse<NonNullable<T>> | TErroredAPIResponse;

export const returnResponse = <T>(data: APIResponse<T>) => data;

function urlSearchParamsToObject(params: URLSearchParams) {
  const result: Record<string, string> = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}

type InferSchema<Z> = Z extends ZodType ? ZodInfer<Z> : never;

function hasProp<Prop extends string | number | symbol>(
  value: unknown,
  prop: Prop
): value is Record<Prop, unknown> {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value !== "object") {
    return false;
  }

  return prop in value;
}

const ReturnErroredResponse = (error: unknown) => {
  const isZodError = error instanceof ZodError;

  const message = isZodError
    ? fromZodError(error).message
    : hasProp(error, "message")
    ? (error.message as string)
    : "An unknown error occurred";
  return NextResponse.json(
    returnResponse({
      message: message,
      success: false,
      data: null,
    }),
    {
      status: 500,
    }
  );
};

const builder = <Context>(ctx: Context) => ({
  create(req: Request) {
    return {
      input<T, V>(
        schema: { query?: ZodType<T>; body?: ZodType<V> } | undefined
      ) {
        return {
          async procedure<Result>(
            procedureFn: ProcedureFn<Context, Result, ZodType<T>, ZodType<V>>
          ) {
            const { searchParams } = new URL(req.url);
            let parsedQuery;
            let parsedBody;

            if (schema?.query) {
              try {
                parsedQuery = schema.query.parse(
                  urlSearchParamsToObject(searchParams)
                );
              } catch (error) {
                return ReturnErroredResponse(error);
              }
            }

            if (schema?.body) {
              try {
                const body = await req.json();
                parsedBody = schema.body.parse(body);
              } catch (error) {
                return ReturnErroredResponse(error);
              }
            }

            try {
              const result = await procedureFn({
                req,
                ctx,
                input: { query: parsedQuery as T, body: parsedBody as V },
                res: NextResponse,
              });
              return NextResponse.json(
                returnResponse({
                  success: true,
                  data: result ? result : {},
                  message: null,
                }),
                {
                  status: 200,
                }
              );
            } catch (error) {
              return ReturnErroredResponse(error);
            }
          },
        };
      },
    };
  },
});

function createAPI<Context>(config: Config<Context>) {
  const context = config.createContext();
  return builder(context);
}

export const api = createAPI({
  createContext: () => {
    return { db };
  },
});
