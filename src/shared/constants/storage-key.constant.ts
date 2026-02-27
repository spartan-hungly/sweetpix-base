export const STORAGE_KEYS = {
  LOGIN_SESSION: {
    key: "loginSession",
    expiryTimeInMs: 24 * 60 * 60 * 1000, // 24 hours
  },
};

export type StorageValue = {
  value: JSON;
  isEmpty: boolean;
};

export type StorageKey = {
  key: string;
  expiryTimeInMs: number;
};
