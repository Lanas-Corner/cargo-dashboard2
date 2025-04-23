import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const cargoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        trackingNo: z.string().min(1),
        status: z.string().min(1),
        origin: z.string().min(1),
        destination: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cargo.create({
        data: {
          trackingNo: input.trackingNo,
          status: input.status,
          origin: input.origin,
          destination: input.destination,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.cargo.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const cargo = await ctx.db.cargo.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return cargo ?? null;
  }),
});
