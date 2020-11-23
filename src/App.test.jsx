import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {

  test("should contain the simple form", () => {
    const { getByLabelText } = render(<App />);
    const firstNameField = getByLabelText("First Name");
    expect(firstNameField).toBeInTheDocument();
  });

});
