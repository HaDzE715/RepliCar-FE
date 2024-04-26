import React from "react";
import { render } from "@testing-library/react";
import Home from "../Pages/home"; // Adjust the path if needed

test("renders Home component", () => {
  render(<Home />);
});
