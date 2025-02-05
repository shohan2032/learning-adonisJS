# AdonisJS intstallation 
- Create a project and get prompted for all options
- npm init adonisjs@latest project_name
## Run ESLint
npm run lint

## Run ESLint and auto-fix issues
npm run lint -- --fix

## Run prettier
npm run format
--- 
### Configuration
AdonisJS configuration documentation covers how to manage and customize the framework’s settings using environment variables and configuration files. Here's a brief summary:

1. **Config Files**: Stored in the `config/` directory, these files define settings for the application, including database, mail, session, and more.
2. **Environment Variables (`.env`)**: Sensitive or environment-specific settings should be stored in `.env` files and accessed using `Env.get()`.
3. **Accessing Configs**: Use `Config.get('file.key', defaultValue)` to retrieve settings.
4. **Updating Configs**: You can modify configurations at runtime using `Config.set('file.key', newValue)`, though it's not recommended for production.
5. **Service Providers**: Some configurations (e.g., database, mail) are loaded through service providers.
6. **Validation**: Use `Env.rules` in `env.ts` to enforce type checking and required environment variables.

## **app.ts**
Yes, this `app.ts` file in the `config/` directory is a default configuration file in an AdonisJS project. It manages core application settings, including security keys, HTTP server configurations, and cookie settings. Here's a breakdown:

### **1. App Key (`appKey`)**
- **Purpose:** Used for encrypting cookies, signing URLs, and handling encrypted data.
- **Implementation:**  
  ```ts
  export const appKey = new Secret(env.get('APP_KEY'))
  ```
  - Retrieves the app key from environment variables (`.env`).
  - Uses `Secret` to ensure safe handling.

### **2. HTTP Server Configuration (`http`)**
Defined using `defineConfig()`:
- **`generateRequestId: true`** → Enables unique request IDs for tracking requests.
- **`allowMethodSpoofing: false`** → Disables method spoofing (changing HTTP methods via query parameters).
- **`useAsyncLocalStorage: false`** → Disables AsyncLocalStorage (which allows access to request-specific data globally in the app).

### **3. Cookie Configuration (`cookie`)**
- **`domain: ''`** → No specific domain restriction.
- **`path: '/'`** → Cookies are available site-wide.
- **`maxAge: '2h'`** → Cookies expire in 2 hours.
- **`httpOnly: true`** → Prevents client-side JavaScript access (security feature).
- **`secure: app.inProduction`** → Enables cookies only on HTTPS when in production.
- **`sameSite: 'lax'`** → Mitigates CSRF attacks while allowing external navigation.

### **Purpose of this File**
This file centralizes and standardizes application settings, ensuring consistency and security. It helps manage core behaviors without modifying the codebase in multiple places.
--- 
## **auth.ts**
The `auth.ts` file in the `config/` directory of an AdonisJS project defines authentication settings. It configures how users are authenticated using different guards (authentication strategies).  

---

### **Breakdown of `auth.ts`**

#### **1. Importing Required Modules**
```ts
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
```
- `defineConfig` → Used to define the authentication configuration.
- `sessionGuard` → A session-based authentication mechanism.
- `sessionUserProvider` → Defines how user data is retrieved (from the session).
- `InferAuthenticators`, `InferAuthEvents`, `Authenticators` → Type utilities for strong typing.

---

#### **2. Defining Authentication Configuration**
```ts
const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
  },
})
```
- **`default: 'web'`** → Specifies that the `web` guard (session-based authentication) is the default.
- **`guards: { web: sessionGuard({...}) }`** → Defines the authentication method:
  - Uses **session-based authentication**.
  - **Does not use "remember me" tokens** (`useRememberMeTokens: false`).
  - Retrieves user data from the **User model** (`#models/user`).

---

#### **3. Exporting Configuration**
```ts
export default authConfig
```
- Exports the configuration for use in the AdonisJS application.

---

#### **4. Type Inference for Authentication**
```ts
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
```
- **Extends the `Authenticators` interface** to include inferred authentication types.
- **Extends the `EventsList` interface** to include authentication-related events (e.g., login/logout events).

---

### **Summary**
- This configuration enables **session-based authentication** using the `User` model.
- Users are authenticated via sessions (not tokens).
- The default guard is `web`.
- Strong typing is applied for authentication-related functionality.
---
### **bodyparser.ts**
### **Understanding `bodyparser.ts` Configuration in AdonisJS**
The `bodyparser.ts` file in the `config/` directory defines settings for parsing incoming request bodies in AdonisJS. It configures how the framework handles different content types like JSON, form data, and file uploads.

---

### **Breakdown of `bodyparser.ts`**
#### **1. Importing Required Modules**
```ts
import { defineConfig } from '@adonisjs/core/bodyparser'
```
- `defineConfig` → Used to define the body parser configuration.

---

#### **2. Allowed HTTP Methods**
```ts
allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
```
- Specifies that **only** these HTTP methods will have their request bodies parsed.

---

#### **3. Form Data (`application/x-www-form-urlencoded`)**
```ts
form: {
  convertEmptyStringsToNull: true,
  types: ['application/x-www-form-urlencoded'],
},
```
- Converts empty strings to `null` (prevents storing empty values).
- Parses requests with `application/x-www-form-urlencoded` content type.

---

#### **4. JSON Data Parsing**
```ts
json: {
  convertEmptyStringsToNull: true,
  types: [
    'application/json',
    'application/json-patch+json',
    'application/vnd.api+json',
    'application/csp-report',
  ],
},
```
- **Converts empty strings to `null`**.
- Parses different JSON content types, including:
  - Standard JSON (`application/json`).
  - JSON Patch (`application/json-patch+json`).
  - API JSON (`application/vnd.api+json`).
  - CSP violation reports (`application/csp-report`).

---

#### **5. Multipart (File Uploads) Handling**
```ts
multipart: {
  autoProcess: true,
  convertEmptyStringsToNull: true,
  processManually: [],

  limit: '20mb',
  types: ['multipart/form-data'],
},
```
- **`autoProcess: true`** → Automatically processes file uploads and stores them in the system's temporary directory.
- **`convertEmptyStringsToNull: true`** → Ensures empty values are stored as `null`.
- **`processManually: []`** → No specific fields are marked for manual processing.
- **`limit: '20mb'`** → Restricts total upload size to 20MB.
- **`types: ['multipart/form-data']`** → Accepts `multipart/form-data` requests (used for file uploads).

---

### **Summary**
- **Parses request bodies** for `POST`, `PUT`, `PATCH`, and `DELETE` requests.
- **Handles form data, JSON, and multipart (file uploads)** requests.
- **Automatically processes files** unless explicitly disabled.
- **Limits request body size** to 20MB to prevent abuse.
---
### **cors.ts**
### **Understanding `cors.ts` Configuration in AdonisJS**
The `cors.ts` file in the `config/` directory defines **CORS (Cross-Origin Resource Sharing) settings**, controlling which external domains can interact with your AdonisJS backend.

---

### **Breakdown of `cors.ts`**

#### **1. Importing Required Modules**
```ts
import { defineConfig } from '@adonisjs/cors'
```
- `defineConfig` → Used to define the CORS configuration.

---

#### **2. Enabling CORS**
```ts
enabled: true,
```
- Enables CORS for all incoming requests.

---

#### **3. Allowed Origins**
```ts
origin: true,
```
- `true` → Allows requests from **any** origin (`*`).
- Can be set to a specific domain (e.g., `'https://example.com'`) to restrict access.

---

#### **4. Allowed HTTP Methods**
```ts
methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
```
- Defines which HTTP methods are allowed for cross-origin requests.

---

#### **5. Allowed Headers**
```ts
headers: true,
```
- `true` → Allows the browser to send any custom headers.
- Can be restricted to specific headers (e.g., `['Authorization', 'Content-Type']`).

---

#### **6. Exposed Headers**
```ts
exposeHeaders: [],
```
- Defines headers that should be exposed to the frontend.
- Empty array `[]` means **no headers** are explicitly exposed.

---

#### **7. Credentials Support**
```ts
credentials: true,
```
- Allows sending **cookies and authentication tokens** with cross-origin requests (`Access-Control-Allow-Credentials: true`).

---

#### **8. Cache Duration (`maxAge`)**
```ts
maxAge: 90,
```
- Specifies how long (in seconds) the browser can **cache** the CORS preflight request.
- Here, **90 seconds**.

---

### **Summary**
- ✅ **CORS is enabled** for all origins.
- ✅ **Allows major HTTP methods** (`GET`, `POST`, `PUT`, etc.).
- ✅ **Permits all headers**.
- ✅ **Supports cookies & authentication tokens** (`credentials: true`).
- ✅ **Caches preflight responses for 90 seconds**.
---
### **database.ts**
### **Understanding `database.ts` Configuration in AdonisJS**  
The `database.ts` file in the `config/` directory defines **database connection settings** for AdonisJS, allowing it to interact with relational databases like MySQL, PostgreSQL, and SQLite.  

---

### **Breakdown of `database.ts`**
#### **1. Importing Required Modules**
```ts
import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'
```
- **`env`** → Used to load database credentials from the `.env` file.
- **`defineConfig`** → Function from `@adonisjs/lucid` to define database settings.

---

#### **2. Setting the Default Connection**
```ts
connection: 'mysql',
```
- Specifies that **MySQL** is the default database engine.

---

#### **3. MySQL Connection Configuration**
```ts
connections: {
  mysql: {
    client: 'mysql2',
    connection: {
      host: env.get('DB_HOST'),
      port: env.get('DB_PORT'),
      user: env.get('DB_USER'),
      password: env.get('DB_PASSWORD'),
      database: env.get('DB_DATABASE'),
    },
  },
},
```
- Uses `mysql2` as the **database client**.
- Retrieves credentials from the `.env` file:
  - `DB_HOST` → Database host (e.g., `localhost` or remote server).
  - `DB_PORT` → MySQL port (default: `3306`).
  - `DB_USER` → Username for authentication.
  - `DB_PASSWORD` → Password for authentication.
  - `DB_DATABASE` → Database name.

---

#### **4. Migration Configuration**
```ts
migrations: {
  naturalSort: true,
  paths: ['database/migrations'],
},
```
- **`naturalSort: true`** → Ensures migrations run in order based on filenames.
- **`paths: ['database/migrations']`** → Specifies where migration files are stored.

---

### **Summary**
✅ **MySQL database connection** configured using environment variables.  
✅ **Uses `mysql2`** as the database driver for better performance.  
✅ **Migration files** stored in `database/migrations`.  
✅ **Secure and flexible** using `.env` for credentials.  

### **hash.ts**
### **Understanding `hash.ts` Configuration in AdonisJS**  
The `hash.ts` file in the `config/` directory defines settings for **password hashing** in AdonisJS. It ensures secure storage of passwords using a strong cryptographic algorithm.

---

### **Breakdown of `hash.ts`**

#### **1. Importing Required Modules**
```ts
import { defineConfig, drivers } from '@adonisjs/core/hash'
```
- **`defineConfig`** → Function used to define the hashing configuration.
- **`drivers`** → Provides different hashing algorithms (e.g., bcrypt, argon2, scrypt).

---

#### **2. Setting the Default Hashing Algorithm**
```ts
default: 'scrypt',
```
- Uses **scrypt** as the default hashing algorithm (a strong and memory-hard function designed to resist brute-force attacks).

---

#### **3. Configuring the Hashing Algorithm**
```ts
list: {
  scrypt: drivers.scrypt({
    cost: 16384,
    blockSize: 8,
    parallelization: 1,
    maxMemory: 33554432,
  }),
},
```
- **`cost: 16384`** → Computational cost (higher = more secure but slower).
- **`blockSize: 8`** → Determines internal memory usage.
- **`parallelization: 1`** → Number of parallel threads used.
- **`maxMemory: 33554432`** → Limits memory usage to **32MB**.

---

#### **4. Exporting the Configuration**
```ts
export default hashConfig
```
- Makes the hashing configuration available throughout the AdonisJS app.

---

#### **5. Type Inference for Hashing**
```ts
declare module '@adonisjs/core/types' {
  export interface HashersList extends InferHashers<typeof hashConfig> {}
}
```
- Ensures **strong type inference** for the available hashers.
- Helps AdonisJS **recognize custom hashing configurations**.

---

### **Summary**
✅ **Uses scrypt for hashing** (highly secure and resistant to brute-force attacks).  
✅ **Fine-tuned cost, memory, and parallelization settings** for efficiency.  
✅ **Supports additional hashers** like bcrypt or argon2 (can be added if needed).  
✅ **Strong typing for safety and flexibility**.  
---
### **logger.ts**
### **Understanding `logger.ts` Configuration in AdonisJS**  
The `logger.ts` file in the `config/` directory defines **logging settings** for AdonisJS. It controls how logs are handled, where they are stored, and their verbosity level.

---

### **Breakdown of `logger.ts`**

#### **1. Importing Required Modules**
```ts
import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, targets } from '@adonisjs/core/logger'
```
- **`env`** → Loads environment variables (e.g., log level, app name).
- **`app`** → Provides environment-based checks (`app.inProduction`).
- **`defineConfig`** → Defines the logging configuration.
- **`targets`** → Specifies log output formats (console, file, etc.).

---

#### **2. Setting the Default Logger**
```ts
default: 'app',
```
- **`'app'`** is the default logger used throughout the application.

---

#### **3. Defining Loggers**
```ts
loggers: {
  app: {
    enabled: true,
    name: env.get('APP_NAME'),
    level: env.get('LOG_LEVEL'),
```
- **`enabled: true`** → Ensures logging is active.
- **`name`** → Sets the logger name using `APP_NAME` from `.env`.
- **`level`** → Controls the verbosity (`debug`, `info`, `warn`, `error`).

---

#### **4. Configuring Log Transport (Console vs. File)**
```ts
transport: {
  targets: targets()
    .pushIf(!app.inProduction, targets.pretty())
    .pushIf(app.inProduction, targets.file({ destination: 1 }))
    .toArray(),
},
```
- **Development (`!app.inProduction`)**  
  - Uses `targets.pretty()`, which logs formatted output to the console.
- **Production (`app.inProduction`)**  
  - Uses `targets.file({ destination: 1 })`, storing logs in a file (`1` represents `stdout` in Unix-like systems).

---

#### **5. Exporting the Configuration**
```ts
export default loggerConfig
```
- Makes the logger settings available across the application.

---

#### **6. Type Inference for Loggers**
```ts
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
```
- Ensures **strong type inference** for the loggers.
- Helps AdonisJS recognize custom logging configurations.

---

### **Summary**
✅ **Logs are active**, with environment-based log levels.  
✅ **Development logs** are pretty-printed in the console.  
✅ **Production logs** are saved to a file for efficiency.  
✅ **Highly flexible**, allowing multiple loggers if needed.  
---
### **session.ts**
### **Understanding `session.ts` Configuration in AdonisJS**  
The `session.ts` file in the `config/` directory defines **session management settings** in AdonisJS. Sessions allow you to store user data (like authentication states) between requests.

---

### **Breakdown of `session.ts`**

#### **1. Importing Required Modules**
```ts
import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, stores } from '@adonisjs/session'
```
- **`env`** → Loads environment variables (e.g., session driver).
- **`app`** → Checks environment (`app.inProduction` for secure cookies).
- **`defineConfig`** → Defines the session configuration.
- **`stores`** → Provides built-in session storage options (e.g., cookie, Redis, database).

---

#### **2. Enabling Session Management**
```ts
enabled: true,
cookieName: 'adonis-session',
```
- **`enabled: true`** → Activates session management.
- **`cookieName: 'adonis-session'`** → Defines the name of the session cookie.

---

#### **3. Handling Session Expiration**
```ts
clearWithBrowser: false,
age: '2h',
```
- **`clearWithBrowser: false`** → Keeps session data after closing the browser.
- **`age: '2h'`** → Sessions expire after **2 hours** of inactivity.

---

#### **4. Configuring Session Cookie**
```ts
cookie: {
  path: '/',
  httpOnly: true,
  secure: app.inProduction,
  sameSite: 'lax',
},
```
- **`path: '/'`** → The session cookie is available across all routes.
- **`httpOnly: true`** → Prevents JavaScript from accessing the session cookie (for security).
- **`secure: app.inProduction`** → Uses HTTPS in production.
- **`sameSite: 'lax'`** → Restricts cross-site cookie usage for security.

---

#### **5. Selecting the Session Store**
```ts
store: env.get('SESSION_DRIVER'),
```
- The session driver is **set dynamically** using the `SESSION_DRIVER` environment variable.
- Common values for `SESSION_DRIVER`:
  - `'cookie'` → Stores session data in cookies.
  - `'redis'` → Uses Redis for better scalability.
  - `'database'` → Stores sessions in a database.

---

#### **6. Configuring Available Session Stores**
```ts
stores: {
  cookie: stores.cookie(),
}
```
- Defines **session stores** (in this case, only `cookie` is enabled).
- Other possible stores: `stores.redis()`, `stores.db()`, etc.

---

### **Summary**
✅ **Sessions are enabled**, with a `2-hour` timeout.  
✅ **Uses cookies by default**, but can switch to Redis or database via `.env`.  
✅ **Secure session management** (HTTP-only, `secure` in production).  
✅ **Supports multiple session stores** for scalability.  


# CSRF
A **CSRF (Cross-Site Request Forgery) token** is a security measure used to prevent unauthorized commands from being executed on behalf of an authenticated user. It is commonly implemented in web applications to protect against CSRF attacks.

### 🔹 **How CSRF Attacks Work**
CSRF attacks trick a user's browser into making unintended requests to a web application where they are already authenticated. For example:
1. A user logs into a banking website and their session is active.
2. The user visits a malicious website that contains a hidden request to transfer money from their account.
3. Since the user's session is still active, the banking site processes the request as if the user intended it.

### 🔹 **How CSRF Tokens Prevent This**
A **CSRF token** is a unique, randomly generated string that is sent along with each request requiring authentication. The application verifies this token before processing the request. If the token is missing or incorrect, the request is rejected.

#### ✅ **How It Works in a Web Application**
1. When a user logs in, the server generates a CSRF token and stores it in the session.
2. The token is sent to the frontend (e.g., embedded in forms as a hidden input field).
3. When the user submits a form or sends a request, the token is included in the request.
4. The server validates the token before processing the request.

### 🔹 **Example in Django**
Django includes built-in CSRF protection. A typical HTML form with CSRF protection looks like:
```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="message">
    <button type="submit">Send</button>
</form>
```
Here, `{% csrf_token %}` injects the CSRF token into the form.

### 🔹 **Example in Express.js (Node.js)**
In an Express.js application, you can use `csurf` middleware:
```javascript
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.get('/form', (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', (req, res) => {
    res.send('Form submitted successfully!');
});
```
Here, `req.csrfToken()` generates a token, which must be sent with form submissions.

### 🔹 **Key Takeaways**
- CSRF tokens prevent unauthorized requests by verifying that the request originates from a trusted source.
- They are unique per session and expire after a certain period.
- Many web frameworks (Django, Spring Security, Express.js) provide built-in support for CSRF protection.

Yes, **AdonisJS** has built-in **CSRF (Cross-Site Request Forgery) protection** through its **Shield middleware**. This middleware automatically generates and verifies CSRF tokens for incoming requests.

---

## **🔹 How CSRF Protection Works in AdonisJS**
1. When a user makes a request (e.g., accessing a form page), AdonisJS generates a **CSRF token** and stores it in a cookie.
2. The token must be included in subsequent **POST, PUT, PATCH, or DELETE** requests.
3. The server verifies the token before processing the request.
4. If the token is missing or invalid, the request is rejected with a `403 Forbidden` error.

---

## **🔹 Enabling CSRF Protection**
CSRF protection in AdonisJS is enabled by default using the **Shield middleware**. The configuration is found in `config/shield.ts`:

```typescript
import { ShieldConfig } from '@ioc:Adonis/Addons/Shield'

const shieldConfig: ShieldConfig = {
  csrf: {
    enabled: true,
    exceptRoutes: [],  // Add routes to exclude from CSRF protection
    enableXsrfCookie: true,  // Enables `XSRF-TOKEN` cookie for frontend apps
  },
}

export default shieldConfig
```

---

## **🔹 Using CSRF in Forms (Edge Templates)**
In **AdonisJS Edge templates**, you can include the CSRF token using:

```html
<form method="POST" action="/submit">
    <input type="hidden" name="_csrf" value="{{ csrfToken() }}">
    <input type="text" name="message">
    <button type="submit">Send</button>
</form>
```

---

## **🔹 CSRF in API Requests (Frontend)**
If you're making API requests from a frontend (React, Vue, etc.), ensure that:
1. The CSRF token is **read from the `XSRF-TOKEN` cookie**.
2. It is sent in the `X-CSRF-TOKEN` header.

### **Example with Axios**
```javascript
import axios from 'axios';

// Get CSRF token from cookie
const csrfToken = document.cookie.split('; ')
  .find(row => row.startsWith('XSRF-TOKEN='))
  ?.split('=')[1];

axios.post('/submit', { message: 'Hello' }, {
    headers: { 'X-CSRF-TOKEN': csrfToken }
}).then(response => console.log(response.data));
```

---

## **🔹 Disabling CSRF for Specific Routes**
If you need to **disable CSRF for certain routes** (e.g., APIs for third-party services), you can update `config/shield.ts`:

```typescript
exceptRoutes: ['/api/*']
```

---

## **✅ Summary**
✔ **AdonisJS has built-in CSRF protection** via the Shield middleware.  
✔ CSRF tokens are stored in cookies and must be included in protected requests.  
✔ You can **enable, disable, or customize** CSRF settings easily in `config/shield.ts`.  
✔ Frontend applications can fetch and send CSRF tokens via `XSRF-TOKEN`.  
