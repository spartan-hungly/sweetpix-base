import { logger } from "@/libs/logger";

import type { StorageKey } from "../constants";

export type StorageValue = {
  value?: JSON;
  isEmpty: boolean;
};

export class StorageService {
  public static setItem(storageKey: StorageKey, value: any) {
    this.setItemWithExpiry(storageKey.key, value, storageKey.expiryTimeInMs);
  }

  private static setItemWithExpiry(key: string, value: any, expiryTimeInMs: number) {
    try {
      const now = new Date().getTime();
      const item = {
        value: value,
        expiry: now + expiryTimeInMs,
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      logger.error(error);
    }
  }

  public static getItem(key: string) {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        const defaultItem: StorageValue = { value: undefined, isEmpty: true };
        return defaultItem;
      }

      const parsedItem = JSON.parse(item);

      if (parsedItem.expiry) {
        const now = new Date().getTime();
        if (now > parsedItem.expiry) {
          localStorage.removeItem(key);
          const defaultItem: StorageValue = { value: undefined, isEmpty: true };
          return defaultItem;
        }
      }
      return { value: parsedItem.value, isEmpty: false } as StorageValue;
    } catch (error) {
      logger.error(error);
      const defaultItem: StorageValue = { value: undefined, isEmpty: true };
      return defaultItem;
    }
  }

  public static removeItem(key: string) {
    if (typeof localStorage === "undefined") {
      logger.error("localStorage is not defined");
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error(error);
    }
  }

  public static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      logger.error(error);
    }
  }
}
