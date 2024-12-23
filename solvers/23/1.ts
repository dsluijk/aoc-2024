export const solve = (input: string) => {
  const line = input.split("\n");
  const connections: { [computer: string]: string[] } = {};

  for (const connection of line) {
    const [a, b] = connection.split("-");

    if (connections[a] === undefined) connections[a] = [];
    if (connections[b] === undefined) connections[b] = [];

    connections[a].push(b);
    connections[b].push(a);
  }

  const interconnections = new Set<string>();

  for (const [connection, connected] of Object.entries(connections)) {
    if (!connection.startsWith("t")) continue;

    for (const computerA of connected) {
      if (computerA === connection) continue;

      for (const computerB of connected) {
        if (computerA === computerB) continue;
        if (computerB === connection) continue;

        if (connections[computerA].includes(computerB)) {
          const triangle = [connection, computerA, computerB].sort();
          interconnections.add(triangle.join(","));
        }
      }
    }
  }

  return interconnections.size;
};
