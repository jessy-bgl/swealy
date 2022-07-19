abstract class ICoinRepository {
  abstract fetchPrice(symbol: string): Promise<number>;
}

export { ICoinRepository };
