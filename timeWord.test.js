const { timeWord } = require("./timeWord");

describe("#timeword", () => {
  const midnight = timeWord("00:00");
  const noon = timeWord("12:00");
  const test1 = timeWord("00:12");
  const test2 = timeWord("12:12");
  const test3 = timeWord("01:00");
  const test4 = timeWord("06:01");
  test("it is a function", () => {
    expect(typeof timeWord).toBe("function");
  });

  test("WORKS: midnight", () => {
    expect(midnight).toEqual("Midnight");
  });

  test("WORKS: noon", () => {
    expect(noon).toEqual("Noon");
  });

  test("WORKS: test1", () => {
    expect(test1).toEqual("twelve twelve am");
  });

  test("WORKS: test2", () => {
    expect(test2).toEqual("twelve twelve pm");
  });
  test("WORKS: test3", () => {
    expect(test3).toEqual("one o'clock am");
  });
  test("WORKS: test4", () => {
    expect(test4).toEqual("six oh one am");
  });
});
