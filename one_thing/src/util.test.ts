import { weekTimeRange } from "./util";

describe("weekTimeRange", () => {
  it("returns the start and end dates of the week", () => {
    const now = new Date("Sat Apr 06 2019 13:26:31 GMT");
    const range = weekTimeRange(now);
    const expected = {
      from: new Date("Sun Mar 31 2019 00:00:00 GMT"),
      to: new Date("Sun Apr 07 2019 00:00:00 GMT")
    };
    expect(range).toEqual(expected);
  });
});
