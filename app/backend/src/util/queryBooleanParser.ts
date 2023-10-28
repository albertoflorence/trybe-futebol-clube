import { ParsedQs } from 'qs';

export default function parseBooleanQuery<T>(query: ParsedQs): T {
  return Object.entries(query).reduce((acc, [key, value]) => {
    if (value === 'true') {
      acc[key as keyof T] = true as unknown as T[keyof T];
    } else if (value === 'false') {
      acc[key as keyof T] = false as unknown as T[keyof T];
    }
    return acc;
  }, {} as T);
}
