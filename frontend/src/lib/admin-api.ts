const TOKEN_KEY = "rankrseo_admin_token"

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    clearToken()
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login"
    }
    throw new Error("Unauthorized")
  }

  if (res.status === 204) return undefined as T

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Request failed")
  return data
}

export const adminApi = {
  // Auth
  login(email: string, password: string) {
    return request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) },
    ).then((res) => {
      setToken(res.token)
      return res
    })
  },

  register(name: string, email: string, password: string) {
    return request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify({ name, email, password }) },
    ).then((res) => {
      setToken(res.token)
      return res
    })
  },

  getMe() {
    return request<{ id: string; name: string; email: string; role: string; createdAt: string }>(
      "/api/auth/me",
    )
  },

  logout() {
    clearToken()
  },

  isAuthenticated(): boolean {
    return !!getToken()
  },

  // Leads
  getLeads(params?: { status?: string; search?: string }) {
    const query = new URLSearchParams()
    if (params?.status && params.status !== "All") query.set("status", params.status)
    if (params?.search) query.set("search", params.search)
    const qs = query.toString()
    return request<Array<{
      id: string; name: string; email: string; phone: string | null
      website: string | null; company: string | null; service: string | null
      message: string | null; budget: string | null; source: string | null
      status: string; notes: string | null
      createdAt: string; updatedAt: string
    }>>(`/api/leads${qs ? `?${qs}` : ""}`)
  },

  getLead(id: string) {
    return request<Record<string, unknown>>(`/api/leads/${id}`)
  },

  updateLead(id: string, data: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  deleteLead(id: string) {
    return request<void>(`/api/leads/${id}`, { method: "DELETE" })
  },

  // Contact Messages
  getMessages(read?: boolean) {
    const qs = read !== undefined ? `?read=${read}` : ""
    return request<Array<{
      id: string; name: string; email: string; phone: string | null
      company: string | null; service: string | null; message: string | null
      budget: string | null; read: boolean
      createdAt: string
    }>>(`/api/contact${qs}`)
  },

  // Blog
  getBlogPosts() {
    return request<{ posts: Array<Record<string, unknown>>; pagination: Record<string, unknown> }>(
      "/api/blog",
    )
  },

  createBlogPost(data: Record<string, unknown>) {
    return request<Record<string, unknown>>("/api/blog", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateBlogPost(id: string, data: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/blog/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  deleteBlogPost(id: string) {
    return request<void>(`/api/blog/${id}`, { method: "DELETE" })
  },

  // Cases
  getCases() {
    return request<Array<Record<string, unknown>>>("/api/cases")
  },

  getCase(slug: string) {
    return request<Record<string, unknown>>(`/api/cases/${slug}`)
  },

  createCase(data: Record<string, unknown>) {
    return request<Record<string, unknown>>("/api/cases", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateCase(id: string, data: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/cases/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  deleteCase(id: string) {
    return request<void>(`/api/cases/${id}`, { method: "DELETE" })
  },

  // Testimonials
  getTestimonials() {
    return request<Array<Record<string, unknown>>>("/api/testimonials")
  },

  createTestimonial(data: Record<string, unknown>) {
    return request<Record<string, unknown>>("/api/testimonials", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateTestimonial(id: string, data: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/testimonials/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  deleteTestimonial(id: string) {
    return request<void>(`/api/testimonials/${id}`, { method: "DELETE" })
  },

  // Portfolio
  getPortfolioItems() {
    return request<Array<Record<string, unknown>>>("/api/portfolio")
  },

  createPortfolioItem(data: Record<string, unknown>) {
    return request<Record<string, unknown>>("/api/portfolio", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updatePortfolioItem(id: string, data: Record<string, unknown>) {
    return request<Record<string, unknown>>(`/api/portfolio/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  deletePortfolioItem(id: string) {
    return request<void>(`/api/portfolio/${id}`, { method: "DELETE" })
  },
}
