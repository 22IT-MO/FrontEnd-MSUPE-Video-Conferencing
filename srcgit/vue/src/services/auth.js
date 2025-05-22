export default {
  async login(email, password) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return { success: false };

    const data = await res.json();
    return { success: true, username: data.username };
  },

  async register(name, email, password) {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, email, password }),
    });

    if (!res.ok) return { success: false };

    return { success: true };
  },

  logout() {
    localStorage.removeItem("isAuthenticated");
    return Promise.resolve();
  },

  checkAuth() {
    return localStorage.getItem("isAuthenticated") === "true";
  }
};
