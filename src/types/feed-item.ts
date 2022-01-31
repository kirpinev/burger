export interface IFeedItem {
  readonly _id: string;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
  readonly ingredients: ReadonlyArray<string>;
}
