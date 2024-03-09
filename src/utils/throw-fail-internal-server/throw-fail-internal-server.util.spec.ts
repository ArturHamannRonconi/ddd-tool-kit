import { Output } from "src/utils/output/output.util";
import { throwFailInternalServer } from "src/utils/throw-fail-internal-server/throw-fail-internal-server.util";

describe("throw-fail-internal-server.util.spec", () => {
  it("should be call output fail and log error", () => {
    const failSpy = jest.spyOn(Output, "fail");
    const errorSpy = jest.spyOn(console, "error");

    const error = new Error("Any message");
    throwFailInternalServer(error);

    expect(failSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
