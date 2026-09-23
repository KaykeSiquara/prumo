import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach } from "vitest";

class RO { observe() {} unobserve() {} disconnect() {} }
Object.assign(globalThis, { ResizeObserver: RO });
Element.prototype.scrollIntoView = function () {};
Element.prototype.hasPointerCapture = () => false;
Element.prototype.releasePointerCapture = () => {};
configure({ asyncUtilTimeout: 5000 });
afterEach(() => cleanup());
