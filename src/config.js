// Global Configuration

// ─── DEV FALLBACK TOKEN ──────────────────────────────────────────────────────
// This token is used ONLY during local development when the login API is not
// yet returning a real token. Once deployed, getToken() in auth.js will always
// use the real token saved to sessionStorage after login — this value is ignored.
// DO NOT use this token in any API call directly. Always call getToken() instead.
export const DEV_FALLBACK_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRVdWlkIjoiNWU5MDRjMTYtYzM5YS0xMWYwLTg4OTktOTliNzRlNmU4MGQxIiwidGVuYW50Um9sZSI6ImFkbWluIiwiYXBwTmFtZSI6InRyYWNlYWJpbGl0eS1hcHBsaWNhdGlvbiIsInBlcm1pc3Npb24iOiJvd25lciIsInNlc3Npb25JZCI6IjJhNWMwNjE3LWE1YzktNDBlOS1hY2NmLWVlNjIyOTE5NDNiZSIsInVzZXJOYW1lIjoicmF2aXJhamoiLCJ1c2VySWQiOjE3ODUsInRlbmFudE5hbWUiOiJhbmRyaXR6IiwiYXBwSWQiOiJhZjg1M2FlMS1jNTEzLTExZjAtODg5OS1hZjI5NzVmOGE2OTgiLCJ0ZW5hbnRJZCI6MTQxLCJ1c2VyVXVpZCI6IjVlODAxZjc1LWMzOWEtMTFmMC04ODk5LTY3ZTVlNzFkNzlkMyIsIm5hbWUiOiJyYXZpcmFqIGpvc2hpIiwiZGV0YWlscyI6e30sImFwcFJvbGUiOiJhZG1pbiIsInZhbGlkaXR5Ijo5NjAsImVtYWlsIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwic3ViIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwiaWF0IjoxNzc5MDIyNjQ3LCJleHAiOjE3NzkwMjM2MDd9.n_fzRs_6R041TG_cRIa1LE1tgCsiN5oxwWUR0qyxWvblXQHky6E_fsgHejqTkZb1LWnlOyBgtTcJUnS5LFFhYhi8F-clQ_0zujkRz1wYy_GkkxhHgL0QgjiSq7WQqVNI1JmZwf3z3yDkwbOh9I_7bWfZhn0Qj7Pj_lNINXK-QOETrsSarH7YQyCuf9-bUwRxrHyLql7jpaNnYQb2fFdsR0Avjsz6pojQowoSO1krn120y0MQRufN8Q1fOxd3EyeAlmXslabJRcfSqD6iSqiGIS6WqM10VDBs1_EsvpuIUNg5M-q7mwTOEAOw1YqCtylZ1IKNi0zcnoEdzp49KBgVEQ";
