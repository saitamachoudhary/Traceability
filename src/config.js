// Global Configuration

// ─── DEV FALLBACK TOKEN ──────────────────────────────────────────────────────
// This token is used ONLY during local development when the login API is not
// yet returning a real token. Once deployed, getToken() in auth.js will always
// use the real token saved to sessionStorage after login — this value is ignored.
// DO NOT use this token in any API call directly. Always call getToken() instead.
export const DEV_FALLBACK_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRVdWlkIjoiNWU5MDRjMTYtYzM5YS0xMWYwLTg4OTktOTliNzRlNmU4MGQxIiwidGVuYW50Um9sZSI6ImFkbWluIiwiYXBwTmFtZSI6InRyYWNlYWJpbGl0eS1hcHBsaWNhdGlvbiIsInBlcm1pc3Npb24iOiJvd25lciIsInNlc3Npb25JZCI6ImIwZGFhY2Y0LTRjZTItNDE0Ny05NzJmLWYzMzA2ZTEyOWQ5ZCIsInVzZXJOYW1lIjoicmF2aXJhamoiLCJ1c2VySWQiOjE3ODUsInRlbmFudE5hbWUiOiJhbmRyaXR6IiwiYXBwSWQiOiJhZjg1M2FlMS1jNTEzLTExZjAtODg5OS1hZjI5NzVmOGE2OTgiLCJ0ZW5hbnRJZCI6MTQxLCJ1c2VyVXVpZCI6IjVlODAxZjc1LWMzOWEtMTFmMC04ODk5LTY3ZTVlNzFkNzlkMyIsIm5hbWUiOiJyYXZpcmFqIGpvc2hpIiwiZGV0YWlscyI6e30sImFwcFJvbGUiOiJhZG1pbiIsInZhbGlkaXR5Ijo5NjAsImVtYWlsIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwic3ViIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwiaWF0IjoxNzc4ODI5MDk3LCJleHAiOjE3Nzg4MzAwNTd9.bilnHi3oCDIN49GHnhOhcaZiBgaFUWTlPo52v2nsdKPJ-RYozXX5TRvG-uzmp6XKKg9OBBPkZQDetIgnJD3vW29QX29QpVvM0lhccrmvVi4cPGCkhK9J1U6K4gv8KTIk2ahL-Y3SDAIl0muV1EmkZ0fwXsOggoUSBsMc5-pspgU-aM3dhai2ql44Z8FRH6txo6pvVdCM4K4jHERIYIqyEIr4BiwKmHLDI9rz56Ut2tFTNmON9Oe7e5qhPz09ZjDq6sS4ntCW1MEC96S9QiOhfoRqatzopAi7wb0lSuzuQgHzgr4psWechOm8JzIH_mnI0ydE41Bo0gXFz5RarKuVgw";
