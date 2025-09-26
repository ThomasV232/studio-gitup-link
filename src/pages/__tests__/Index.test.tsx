import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("@/context/StudioContext", () => ({
  useStudio: () => ({
    portfolioItems: [],
    recordContactRequest: vi.fn(),
    user: null,
  }),
}));

import Index from "../Index";

describe("Index hero", () => {
  it("renders without errors when portfolioItems is empty", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/votre prochain film/i),
    ).toBeInTheDocument();
  });
});
