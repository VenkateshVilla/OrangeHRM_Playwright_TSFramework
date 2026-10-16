# HTTP Status Code Memory Trick
1xx = "I"nformation  → Wait
2xx = "O"K           → Success
3xx = "R"edirect     → Go somewhere else
4xx = "Y"ou messed up → Client error
5xx = "S"erver messed up → Server error

I O R Y S

# Most Important Status Codes (Interview + Automation)
200 OK
✅ Request successful

201 Created
✅ New resource created

204 No Content
✅ Success but nothing returned

301 Moved Permanently
➡️ Permanent redirect

302 Found
➡️ Temporary redirect

304 Not Modified
➡️ Use cached version

400 Bad Request
❌ Invalid request syntax

401 Unauthorized
🔒 Authentication required

403 Forbidden
🚫 Authenticated but no permission

404 Not Found
🔍 Resource doesn't exist

405 Method Not Allowed
🚫 Wrong HTTP method

408 Request Timeout
⏳ Request took too long

409 Conflict
⚠️ Data conflict

429 Too Many Requests
🚦 Rate limit exceeded

500 Internal Server Error
💥 Generic server failure

501 Not Implemented
🔨 Feature not supported

502 Bad Gateway
🔄 Invalid response from upstream server

503 Service Unavailable
🚧 Server down or overloaded

504 Gateway Timeout
⏳ Upstream server timed out

# Easy Story Method
200 → Everything OK ✅

400 → You made a mistake ❌
401 → Who are you? 🔒
403 → I know who you are, but no entry 🚫
404 → Can't find it 🔍

500 → Server exploded 💥
502 → Bad middleman 🔄
503 → Server sleeping 😴
504 → Server waiting forever ⏳

# Automation Tester Shortcut
As an SDET/Playwright engineer, memorize these only:

Success:
200, 201, 204

Redirect:
301, 302

Client Errors:
400, 401, 403, 404, 429

Server Errors:
500, 502, 503, 504

# Golden Interview Rule:

400 = My fault, 500 = Server's fault.

401 = Not authenticated, 403 = Not authorized, 404 = Not found.

# Authentication vs Authorization
# -----------------------------------

## Authentication

### Definition
Authentication is the process of verifying the identity of a user, application, or system.

### Purpose
To confirm that the user is who they claim to be.

### Question Answered
Who are you?

### Examples
- Username and Password
- One-Time Password (OTP)
- Fingerprint Scan
- Face Recognition
- Login with Google or Microsoft Account

### Example Scenario
A user enters:
{
  "username": "Admin",
  "password": "admin123"
}

If the credentials are valid, the system authenticates the user successfully.

---

## Authorization

### Definition
Authorization is the process of determining what resources and actions an authenticated user is allowed to access.

### Purpose
To control access based on permissions and roles.

### Question Answered
What are you allowed to do?

### Examples
- Admin can create and delete users.
- Manager can approve requests.
- Employee can view only their own records.
- Guest can read data but cannot modify it.

### Example Scenario
An authenticated user attempts to delete another user's account.

If the user does not have sufficient permissions, access is denied.

---

## Authentication vs Authorization

| Authentication | Authorization |
|---------------|--------------|
| Verifies identity | Verifies permissions |
| Happens first | Happens after authentication |
| Answers "Who are you?" | Answers "What can you do?" |
| Uses credentials | Uses roles and permissions |
| Example: Login | Example: Access Control |

---

## Real-World Example

Entering an office building:

Step 1:
Security verifies your ID card.
Authentication ✅

Step 2:
Your access card allows entry to certain floors only.
Authorization ✅

---

## HTTP Status Codes Related to Authentication and Authorization

### 401 Unauthorized

Meaning:
Authentication failed.

Common Reasons:
- Missing token
- Expired token
- Invalid username/password
- Invalid API key

Memory Trick:
"I don't know who you are."

---

### 403 Forbidden

Meaning:
Authentication succeeded, but the user does not have permission to perform the requested action.

Common Reasons:
- Insufficient role privileges
- Access restricted to administrators
- User lacks required


