export interface Expression {
  text: string;
  language: string;
  meaning: string;
  literal?: string;
}

export interface ConceptGroup {
  concept: string;
  description: string;
  expressions: Expression[];
}

export type Language = 'English' | 'French' | 'German' | 'Spanish' | 'Hindi' | 'Chinese' | 'Japanese' | 'Arabic'; 