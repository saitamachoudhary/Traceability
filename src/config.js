// Global Configuration

// ─── DEV FALLBACK TOKEN ──────────────────────────────────────────────────────
// This token is used ONLY during local development when the login API is not
// yet returning a real token. Once deployed, getToken() in auth.js will always
// use the real token saved to sessionStorage after login — this value is ignored.
// DO NOT use this token in any API call directly. Always call getToken() instead.
export const DEV_FALLBACK_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRVdWlkIjoiNWU5MDRjMTYtYzM5YS0xMWYwLTg4OTktOTliNzRlNmU4MGQxIiwidGVuYW50Um9sZSI6ImFkbWluIiwiYXBwTmFtZSI6InRyYWNlYWJpbGl0eS1hcHBsaWNhdGlvbiIsInBlcm1pc3Npb24iOiJvd25lciIsInNlc3Npb25JZCI6Ijk4NmUxZWUwLWM5YWUtNDg5Zi1hNWFkLWJjOWI1NTE3MDgzMCIsInVzZXJOYW1lIjoicmF2aXJhamoiLCJ1c2VySWQiOjE3ODUsInRlbmFudE5hbWUiOiJhbmRyaXR6IiwiYXBwSWQiOiJhZjg1M2FlMS1jNTEzLTExZjAtODg5OS1hZjI5NzVmOGE2OTgiLCJ0ZW5hbnRJZCI6MTQxLCJ1c2VyVXVpZCI6IjVlODAxZjc1LWMzOWEtMTFmMC04ODk5LTY3ZTVlNzFkNzlkMyIsIm5hbWUiOiJyYXZpcmFqIGpvc2hpIiwiZGV0YWlscyI6e30sImFwcFJvbGUiOiJhZG1pbiIsInZhbGlkaXR5Ijo5NjAsImVtYWlsIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwic3ViIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwiaWF0IjoxNzc4ODQ5NzUwLCJleHAiOjE3Nzg4NTA3MTB9.emGsbkAKQ99yk-9UhITBMthzMOZ210rLo7oMR2KRZaVOCyMLppmtvSSL8gTsc8y3Y3h5_ORdeksELTsODNHVabFGQneo2cEHgwHlucuBtTGwM77htxAJ5YQdFcISjHnbDSUL4-QziT8KfL_N2ufXe2Pl9lcmdAwRI5ieCihr3GEJ5IAvfhspaIBrZRnOC42U-xg57BgZAIy2AGEzntEt44jXTpYVJTqDAoVLsI3Jj3L18W2bwPjExiLtnHJ3U0V_jC3xuGO8wCVca3CzRcNUcu8V_xeMtByMMt59-2uVBwtVhz1CSwEIggXBQKiicA28unXvTU32AxfmXAZEIbGq1Q";
