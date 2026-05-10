export class Restaurant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly contact: string,
    public readonly address: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
