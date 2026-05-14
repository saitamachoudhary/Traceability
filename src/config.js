// Global Configuration

// ─── DEV FALLBACK TOKEN ──────────────────────────────────────────────────────
// This token is used ONLY during local development when the login API is not
// yet returning a real token. Once deployed, getToken() in auth.js will always
// use the real token saved to sessionStorage after login — this value is ignored.
// DO NOT use this token in any API call directly. Always call getToken() instead.
export const DEV_FALLBACK_TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRVdWlkIjoiNWU5MDRjMTYtYzM5YS0xMWYwLTg4OTktOTliNzRlNmU4MGQxIiwidGVuYW50Um9sZSI6ImFkbWluIiwiYXBwTmFtZSI6InRyYWNlYWJpbGl0eS1hcHBsaWNhdGlvbiIsInBlcm1pc3Npb24iOiJvd25lciIsInNlc3Npb25JZCI6IjZmZDI2MGZlLTM5MTQtNGQ0ZS1iMDg2LTE0YWU4ZDk3Y2E1MyIsInVzZXJOYW1lIjoicmF2aXJhamoiLCJ1c2VySWQiOjE3ODUsInRlbmFudE5hbWUiOiJhbmRyaXR6IiwiYXBwSWQiOiJhZjg1M2FlMS1jNTEzLTExZjAtODg5OS1hZjI5NzVmOGE2OTgiLCJ0ZW5hbnRJZCI6MTQxLCJ1c2VyVXVpZCI6IjVlODAxZjc1LWMzOWEtMTFmMC04ODk5LTY3ZTVlNzFkNzlkMyIsIm5hbWUiOiJyYXZpcmFqIGpvc2hpIiwiZGV0YWlscyI6e30sImFwcFJvbGUiOiJhZG1pbiIsInZhbGlkaXR5Ijo5NjAsImVtYWlsIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwic3ViIjoicmF2aXJhampAbHVtZW5vcmUuY29tIiwiaWF0IjoxNzc4NzY4NTQwLCJleHAiOjE3Nzg3Njk1MDB9.X0cMT2x5Xce39qz55eGPf_xGuyCt59dsHE-FVf6Vqx4Tgq3YHMPGNWqh0JsVwUf0Qum2EAXCL7fI9KjzGNbU_9kWBwy3bx8-uxZSWfXKOus6l9j1g3WGVqJ9mHqvkneMRBzt04KXe4sTQ4wbQnHBvTOY1LZvG8C4T0EuOF2emFsjM6bYmuHDLugwqg91te9wrVB2xhKTBqV-Udek-_d5sE-TqiA2ytUAuOI2BL3QRZVnUyTxUrLvmdLRUQSdnFlMQrEnyXuL7x7Cdq50mmarMDDRzgZAMHYmnx3t3zAMx-NFz51mhYPxyr_VSznzsqY9dfkbI3H-WqhWgu7lj8cPVA";
