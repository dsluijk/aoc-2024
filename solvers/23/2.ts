export const solve = (input: string) => {
  const line = input.split("\n");
  const connections: { [computer: string]: Set<string> } = {};

  for (const connection of line) {
    const [a, b] = connection.split("-");

    if (connections[a] === undefined) connections[a] = new Set([a]);
    if (connections[b] === undefined) connections[b] = new Set([b]);

    connections[a].add(b);
    connections[b].add(a);
  }

  let largest = new Set<string>();
  for (const [computer, others] of Object.entries(connections)) {
    let cliques = [new Set([computer, ...others])];

    for (const other of others) {
      let newCliques: Set<string>[] = [];

      for (const clique of cliques) {
        const intersection = clique.intersection(connections[other]);
        if (intersection.size > 0) newCliques.push(intersection);

        if (clique.isDisjointFrom(new Set([other]))) {
          const withoutOther = clique.difference(new Set([other]));

          if (withoutOther.size > 0) newCliques.push(withoutOther);
        }
      }

      cliques = newCliques;
    }

    const largestLocal = cliques.sort((setA, setB) => setB.size - setA.size)[0];
    if (largestLocal.size > largest.size) {
      largest = largestLocal;
    }
  }

  return largest.values().toArray().sort().join(",");
};
