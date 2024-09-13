/**
 * Efface les doublures dans une liste
 * @param input La liste de départ
 * @param callback une fonction qui permet de filter le tableau
 * @returns La liste de sortie
 */
export default function <Value>(
  input: Value[],
  callback: (item: Value) => unknown
): Value[] {
  const output: Value[] = [];

  input.forEach((value) => {
    if (
      output.length === 0 ||
      !output.some(
        (outputElement) => callback(outputElement) === callback(value)
      )
    ) {
      output.push(value);
    }
  });

  return output;
}
