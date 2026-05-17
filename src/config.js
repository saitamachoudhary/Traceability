// Global Configuration

// ─── DEV FALLBACK TOKEN ──────────────────────────────────────────────────────
// This token is used ONLY during local development when the login API is not
// yet returning a real token. Once deployed, getToken() in auth.js will always
// use the real token saved to sessionStorage after login — this value is ignored.
// DO NOT use this token in any API call directly. Always call getToken() instead.
export const DEV_FALLBACK_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRVdWlkIjoiNWU5MDRjMTYtYzM5YS0xMWYwLTg4OTktOTliNzRlNmU4MGQxIiwidGVuYW50Um9sZSI6ImFkbWluIiwiYXBwTmFtZSI6InRyYWNlYWJpbGl0eS1hcHBsaWNhdGlvbiIsInBlcm1pc3Npb24iOiJvd25lciIsInNlc3Npb25JZCI6ImZhYzdjZTFmLTZlZDItNDczNy1hOWMzLWM1YmRmZWIwYjg4YyIsInVzZXJOYW1lIjoicmF2aXJhamoiLCJ1c2VySWQiOjE3ODUsInRlbmFudE5hbWUiOiJhbmRyaXR6IiwiYXBwSWQiOiJhZjg1M2FlMS1jNTEzLTExZjAtODg5OS1hZjI5NzVmOGE2OTgiLCJ0ZW5hbnRJZCI6MTQxLCJ1c2VyVXVpZCI6IjVlODAxZjc1LWMzOWEtMTFmMC04ODk5LTY3ZTVlNzFkNzlkMyIsIm5hbWUiOiJyYXZpcmFqIGpvc2hpIiwiZGV0YWlscyI6e30sImFwcFJvbGUiOiJhZG1pbiIsInZhbGlkaXR5Ijo5NjAsImVtYWlsIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwic3ViIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwiaWF0IjoxNzc5MDI3NDIzLCJleHAiOjE3NzkwMjgzODN9.B7F4dnAyTKQpxnMk-beFiUc9629fAtJyz9X4glioC5uxdBjyWg0KPa2W3nWFZ527MbNx_8UtxY1w3AUPXPKAf5vCbf1_ewx6yEfWEtyRbgRNUIzNNkT-HA8MRJBE-gYtExLnosxrnAWsTFrQNwfBOCfR7JxPBZ7kYM7wt4x1Rk9PPRiwI_OSxLokO0aGkt7wMef0kIdB-TM4m6_wtBmyex-G82Jn-wlhVWaknm3rMTRdkOxrrDaIj79FnHO3B_uiC68FEt8zCsUVYjB1H1X2Ek0CJOlwFRcv6NUjIyCbUWE478dLDj7AjgFl-qqMY4RWf_2cTwFixixQuiggAVQAqw";
