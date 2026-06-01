export const NLP_KEYS = {
  all: ["nlp"],

  match: ["nlp", "match"],

  ranking: (jobId: number) => [
    "nlp",
    "ranking",
    jobId,
  ],
};
