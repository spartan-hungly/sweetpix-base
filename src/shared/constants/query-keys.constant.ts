export const QUERY_KEYS = {
  // USER
  USER: "user",
};

export const USER_KEYS = {
  all: () => [QUERY_KEYS.USER] as const,
  lists: () => [...USER_KEYS.all(), "lists"] as const,
  details: () => [...USER_KEYS.all(), "details"] as const,
  detail: (id: string) => [...USER_KEYS.details(), id] as const,
  me: () => [...USER_KEYS.all(), "me"] as const,
} as const;
