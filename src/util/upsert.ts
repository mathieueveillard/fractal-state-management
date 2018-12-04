export function upsert<T extends { id: string }>(array: T[], item: T): T[] {
  const index: number = array.findIndex(({ id }: T) => id === item.id);
  if (index !== -1) {
    const updatedArray: T[] = array.slice();
    updatedArray.splice(index, 1, item);
    return updatedArray;
  }
  return [...array, item];
}

export function upsertMany<T extends { id: string }>(array: T[], items: T[]): T[] {
  return items.reduce((accumulated: T[], current: T) => upsert(accumulated, current), array);
}
