import '@testing-library/jest-dom/vitest';
import { render, screen} from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PostComments from "~/components/post/post-comments";
import { useComments } from "~/data/comment";

vi.mock("~/data/comment", () => {
    const actual = vi.importActual('~/data/common/repository');
    return{
        ...actual,
        useComments: vi.fn(),
        commentsRepository: {set: vi.fn()}
    }
});

describe("PostComments", () => {
    it("renders loading state initially", () => {
        (useComments as any).mockReturnValue({
            data: null,
            error: null,
            status: "pending",
        });

        render(
            <BrowserRouter>
                <PostComments postId="post1" />
            </BrowserRouter>
        );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders error", () => {
        const mockError = new Error("Failed to load comments");
        (useComments as any).mockReturnValue({
            data: null,
            error: mockError,
            status: "error",
        });

        render(
            <BrowserRouter>
                <PostComments postId="post1" />
            </BrowserRouter>
        );

        expect(screen.getByText(`Error: ${mockError.message}`)).toBeInTheDocument();
    });
});
