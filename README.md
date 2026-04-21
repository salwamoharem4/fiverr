# fiverr
This is a professional backend service for a Fiverr-style marketplace, built with Node.js, Express, and Sequelize.

**ERD(entity relationship diagram)**
<img width="1280" height="249" alt="image" src="https://github.com/user-attachments/assets/a4f31581-f7e6-4e69-bef7-9d66408c59c7" />


**testing
To test the authentication flow:**
1. Register a user via `POST /api/users`.
2. Login via `POST /api/users/login` to receive a JWT Token.
3. Use the token as a **Bearer Token** for protected routes.
