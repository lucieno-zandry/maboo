/**
 * Permet de combiner deux ou plusieurs listes
 * @param arrays Les listes à combiner
 * @returns Le nouveau liste
 */
export default function<T>(...arrays: T[][]): T[] {
  let output: T[] = [];
  
  arrays.forEach((array) => {
    output = output.concat(array);
  });

  return output;
}
