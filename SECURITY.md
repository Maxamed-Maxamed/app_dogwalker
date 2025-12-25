# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability in the Dog Walker App, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

If you believe you have found a security vulnerability, please report it by contacting the project maintainers.

Please include the following details in your report:

* A description of the vulnerability.
* Steps to reproduce the vulnerability.
* The version(s) of the software affected.
* Any potential impact or consequences of the vulnerability.

## Security Best Practices

### For Contributors

When contributing to DogWalker, please follow these security best practices:

#### Code Security

* **Sanitize inputs** - Always validate and sanitize user inputs to prevent injection attacks
* **Use HTTPS** - Ensure all API communications use HTTPS
* **Avoid hardcoding secrets** - Never commit API keys, tokens, or passwords
* **Dependencies** - Keep dependencies updated and use tools like `npm audit` to check for vulnerabilities
* **Authentication** - Implement proper authentication and authorization checks
* **Error handling** - Don't expose sensitive information in error messages

#### Data Protection

* **Encryption** - Sensitive data should be encrypted in transit and at rest
* **Privacy** - Respect user privacy and comply with data protection regulations (GDPR, CCPA, etc.)
* **Access control** - Implement role-based access control (RBAC) for sensitive features
* **Data minimization** - Only collect data that is necessary

#### Mobile Security (React Native Specific)

* **Secure storage** - Use secure storage libraries for sensitive data on mobile devices
* **Certificate pinning** - Consider implementing certificate pinning for API communications
* **Obfuscation** - Enable code obfuscation in production builds
* **Permissions** - Request only necessary device permissions

### For Users

To use DogWalker securely:

* **Keep your app updated** - Always use the latest version
* **Strong passwords** - Use strong, unique passwords for your account
* **Two-factor authentication** - Enable 2FA if available
* **Report suspicious activity** - Report any suspicious behavior to the maintainers
* **Trust verification** - Verify walker/owner profiles before engaging

## Known Security Issues

Currently, there are no known security vulnerabilities. If security issues are discovered and patched, they will be documented here with:

* Description of the issue
* Affected versions
* Fix version
* Workarounds (if applicable)

## Security Update Policy

* **Critical vulnerabilities** - Patches will be released as soon as possible
* **High-priority vulnerabilities** - Patches will be released within 2 weeks
* **Medium/Low vulnerabilities** - Will be included in regular updates

## Dependency Management

We use the following tools to manage security:

* **Dependabot** - Automated dependency updates
* **npm audit** - Regular security audits of dependencies
* **GitHub Security Advisories** - Monitoring for known vulnerabilities

### Keeping Dependencies Updated

Run the following commands regularly:

```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies safely
pnpm update

# Review and install updates
pnpm install
```

## Third-Party Services

DogWalker uses the following third-party services:

* **Supabase** - Backend database and authentication
* **Expo** - React Native framework and build service
* **GitHub** - Version control and CI/CD

Please refer to their respective security policies for information about how they protect your data.

## Compliance

DogWalker is committed to complying with:

* **GDPR** - General Data Protection Regulation
* **CCPA** - California Consumer Privacy Act
* **Data Protection Laws** - Applicable in relevant jurisdictions
* **Industry Standards** - Following OWASP best practices

## Security Headers

When deployed, the application implements:

* **Content Security Policy (CSP)** - Prevents injection attacks
* **X-Frame-Options** - Prevents clickjacking
* **X-Content-Type-Options** - Prevents MIME sniffing
* **Strict-Transport-Security** - Enforces HTTPS

## Vulnerability Disclosure Timeline

Once a vulnerability is reported:

1. **Day 1** - Acknowledge receipt and begin investigation
2. **Days 2-7** - Develop and test fix
3. **Day 8+** - Release patch and publish security advisory
4. **Delayed disclosure** - If needed, responsible disclosure may be delayed with the reporter's consent

## Security Contacts

For security inquiries, please contact:

* **Email**: [maintainers email]
* **GitHub Issue**: Create with "SECURITY" label (for non-sensitive issues)
* **Direct Message**: DM project maintainers on GitHub

## Additional Resources

* [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
* [React Native Security](https://reactnative.dev/docs/security)
* [Supabase Security](https://supabase.com/security)
* [npm Security Best Practices](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
* [GitHub Security Best Practices](https://docs.github.com/en/code-security)
* [GitHub Security Advisories](https://github.com/advisories)
* [PNPM Security Best Practices](https://pnpm.io/security)

## Version History

* **25.12.2025** - Initial security policy created

---

**Thank you for helping keep DogWalker secure!**
