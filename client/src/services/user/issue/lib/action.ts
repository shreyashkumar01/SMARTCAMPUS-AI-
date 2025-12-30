
import { getCurrentUserId } from "@/lib/auth-utils";

export const onIssueSubmit = async (form: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/user/issue/publish`,
      {
        method: "POST",
        body: form,
        credentials: "same-origin",
        headers: {
          "X-User-Id": getCurrentUserId() || "",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: text || "Failed to publish issue" };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to submit issue",
    };
  }
};
