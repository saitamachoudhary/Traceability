// Global Configuration

// ─── DEV FALLBACK TOKEN ──────────────────────────────────────────────────────
// This token is used ONLY during local development when the login API is not
// yet returning a real token. Once deployed, getToken() in auth.js will always
// use the real token saved to sessionStorage after login — this value is ignored.
// DO NOT use this token in any API call directly. Always call getToken() instead.
export const DEV_FALLBACK_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRVdWlkIjoiNWU5MDRjMTYtYzM5YS0xMWYwLTg4OTktOTliNzRlNmU4MGQxIiwidGVuYW50Um9sZSI6ImFkbWluIiwiYXBwTmFtZSI6InRyYWNlYWJpbGl0eS1hcHBsaWNhdGlvbiIsInBlcm1pc3Npb24iOiJvd25lciIsInNlc3Npb25JZCI6Ijg4MDYwNzQyLWFhMjgtNDliMy1hOTAzLTJjOTQ0MzJkNzExOSIsInVzZXJOYW1lIjoicmF2aXJhamoiLCJ1c2VySWQiOjE3ODUsInRlbmFudE5hbWUiOiJhbmRyaXR6IiwiYXBwSWQiOiJhZjg1M2FlMS1jNTEzLTExZjAtODg5OS1hZjI5NzVmOGE2OTgiLCJ0ZW5hbnRJZCI6MTQxLCJ1c2VyVXVpZCI6IjVlODAxZjc1LWMzOWEtMTFmMC04ODk5LTY3ZTVlNzFkNzlkMyIsIm5hbWUiOiJyYXZpcmFqIGpvc2hpIiwiZGV0YWlscyI6e30sImFwcFJvbGUiOiJhZG1pbiIsInZhbGlkaXR5Ijo5NjAsImVtYWlsIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwic3ViIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwiaWF0IjoxNzc4ODUyMTc0LCJleHAiOjE3Nzg4NTMxMzR9.RCwkMCNQy6luCZymASCMPpH7T21HSHs6U5c6HQzrAkJgixV2z1xcHgMsCuNHEhaFFGkNgb5NQY7R7zqPOIainvaX5Sxebs17KOzPwpBmuTAhnTymPaDMJIobL_AOUyxLPLidR85QdfrX-hNnVxi64I4ftf2I-r7GmPJGHOG-rYucXRXl54M4J2cBeRlEjRrBTkqsZwperaPLTRiljRQJY1KsPL5gSj3_efaxFxjmQ9-Q_2OPLOjgO7aT5plvmjLHm0yDtk7QazkcJid8_K6oHO9mEWJF9NFdrs3u_b1CrguGjPGVBvd_q0R_VpGXSfuNcGirqQwytXRjDMXizg6i7A";
