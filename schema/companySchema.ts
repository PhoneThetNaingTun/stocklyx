import * as z from "zod";

export const companySchema = z.object({
  company_name: z.string().min(5).max(100),
  company_logo:
    typeof window === "undefined" ? z.any() : z.instanceof(FileList).optional(),
});

export type CompanySchema = z.infer<typeof companySchema>;
