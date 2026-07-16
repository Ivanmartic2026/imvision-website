export type ContactCategory = "buy" | "rental" | "service";

export interface CategoryConfig {
  value: ContactCategory;
  title: string;
  description: string;
  submitLabel: string;
  recipient: string;
}
