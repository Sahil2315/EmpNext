import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { employeeTS } from "../types";

export async function InitializeLanding(
  router: AppRouterInstance,
  resetUser: (employee: employeeTS) => void
) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    const request = await fetch("/api/verifyToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userToken: userToken,
      },
    });
    const response = await request.json();
    if (response.success) {
      resetUser(response.user);
    } else {
      alert("Token Verification failed\nPlease Sign In Again");
      router.back();
    }
  } else {
    router.back();
  }
}

export async function InitializeLogin(router: AppRouterInstance) {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    const request = await fetch("/api/verifyToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userToken: userToken,
      },
    });
    const response = await request.json();
    if (response.success) {
      router.push("/userdetails");
    } else {
      return;
    }
  } else {
    return;
  }
}
