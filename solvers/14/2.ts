const PARSER = /p=([0-9]+),([0-9]+) v=(-?[0-9]+),(-?[0-9]+)/;

const WIDTH = process.env.NODE_ENV === "test" ? 11 : 101;
const HEIGHT = process.env.NODE_ENV === "test" ? 7 : 103;

type State = {
  pos: [number, number];
  vel: [number, number];
};

export const solve = (input: string) => {
  const lines = input.split("\n");

  const states: State[] = [];
  for (const line of lines) {
    const parsed = line.match(PARSER);
    if (!parsed) continue;
    states.push({
      pos: [Number(parsed[1]), Number(parsed[2])],
      vel: [Number(parsed[3]), Number(parsed[4])],
    });
  }

  let iter = 0;
  while (true) {
    iter++;
    const filled = new Set<string>();
    let overlaps = false;

    for (let state of states) {
      state.pos[0] = (state.pos[0] + state.vel[0] + WIDTH) % WIDTH;
      state.pos[1] = (state.pos[1] + state.vel[1] + HEIGHT) % HEIGHT;

      if (overlaps) continue;
      const key = `${state.pos[0]},${state.pos[1]}`;
      if (filled.has(key)) overlaps = true;
      filled.add(key);
    }

    if (!overlaps) return iter;
  }
};
