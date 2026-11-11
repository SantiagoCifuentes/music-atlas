import { useEffect, useState } from "react";

export type ResourceState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: unknown };

export function useCatalogResource<T>(
  id: string | undefined,
  load: (id: string, signal: AbortSignal) => Promise<T>,
): ResourceState<T> {
  const [state, setState] = useState<ResourceState<T>>({ status: "loading" });

  useEffect(() => {
    if (!id) {
      setState({ status: "error", error: new Error("Missing resource id.") });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });

    void load(id, controller.signal).then(
      (data) => setState({ status: "success", data }),
      (error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setState({ status: "error", error });
        }
      },
    );

    return () => controller.abort();
  }, [id, load]);

  return state;
}
