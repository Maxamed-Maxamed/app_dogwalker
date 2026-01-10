# MCP Integration and Code Quality

## MCP (Model Context Protocol) Overview

MCP enables integration with external tools and services through a standardized protocol. The Dog Walker app uses MCP for code analysis, database management, and other development tools.

## MCP Configuration

### mcp.json Structure

The MCP configuration uses VS Code input references for sensitive tokens. This allows secure credential management through VS Code's input system.

```json
{
  "servers": {
    "codacy": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@codacy/codacy-mcp@latest"],
      "env": {
        "CODACY_ACCOUNT_TOKEN": "${input:codacy_token}"
      }
    },
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:supabase_access_token}"
      }
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "${input:github_token}"
      }
    }
  }
}
```

### Configuration Reference

- Use `${input:token_name}` for credential references (VS Code input references)
- Input references prompt users securely without exposing credentials in config files
- Environment variables (`${ENV_VAR}`) should only be used for non-sensitive configuration

## Codacy Integration

### Code Quality Standards

Codacy analyzes code for:

- Code style violations
- Security vulnerabilities
- Code complexity
- Code duplication
- Best practice violations

### Codacy Configuration

```json
// codacy.json
{
  "engines": {
    "eslint": {
      "enabled": true,
      "exclude_paths": ["node_modules/**", "coverage/**"]
    },
    "tscheck": {
      "enabled": true
    },
    "duplication": {
      "enabled": true,
      "exclude_paths": ["__tests__/**"]
    }
  },
  "exclude_paths": ["node_modules/**", "coverage/**", "*.test.ts", "*.test.tsx"]
}
```

### Using Codacy in Workflow

1. **Pre-commit**: Run local linting
2. **Pull Request**: Codacy automatically analyzes changes
3. **Review**: Address Codacy findings before merge
4. **Monitor**: Track code quality metrics over time

## ESLint Configuration

### .eslintrc.js

```javascript
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    // TypeScript
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",

    // React
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // General
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

### Running ESLint

```bash
# Lint all files
pnpm lint

# Lint and fix
pnpm lint --fix

# Lint specific file
pnpm lint components/WalkCard.tsx
```

## Prettier Configuration

### prettier.config.js

```javascript
module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
};
```

### Running Prettier

```bash
# Format all files
pnpm format

# Check formatting
pnpm format --check

# Format specific file
pnpm format components/WalkCard.tsx
```

## Pre-commit Hooks with Husky

### .husky/pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run linting
pnpm lint-staged

# Run type checking
pnpm tsc --noEmit

# Run tests
pnpm test --bail --findRelatedTests
```

### lint-staged Configuration

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --bail --findRelatedTests"
    ],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/quality-check.yml
name: Code Quality

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Lint
        run: pnpm lint

      - name: Format check
        run: pnpm format --check

      - name: Run tests
        run: pnpm test --coverage

      - name: Upload coverage to Codacy
        uses: codacy/codacy-coverage-reporter-action@v1
        with:
          project-token: ${{ secrets.CODACY_PROJECT_TOKEN }}
          coverage-reports: coverage/lcov.info
```

## Supabase Integration

### Database Setup

```typescript
// utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Type-safe Database Access

```typescript
// types/database.ts
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "owner" | "walker";
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["users"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      walks: {
        Row: {
          id: string;
          dog_id: string;
          walker_id: string;
          owner_id: string;
          scheduled_date: string;
          duration: number;
          status: "scheduled" | "in_progress" | "completed" | "cancelled";
          price: number;
          created_at: string;
        };
      };
    };
  };
};

// Usage
const { data, error } = await supabase
  .from("walks")
  .select("*")
  .eq("owner_id", userId);
```

## Code Quality Metrics

### Target Metrics

- **Code Coverage**: 80%+
- **Codacy Grade**: A or B
- **ESLint Errors**: 0
- **TypeScript Errors**: 0
- **Code Duplication**: <5%
- **Complexity**: <15 per function

### Monitoring

- Check Codacy dashboard weekly
- Review pull request analysis
- Monitor test coverage trends
- Track technical debt

## Best Practices

### DO

- Use TypeScript types effectively
- Fix Codacy issues before merging
- Maintain high test coverage
- Follow ESLint and TypeScript rules
- Use Prettier for consistent formatting
- Write meaningful commit messages
- Document complex code
- Review code quality metrics regularly

### DO NOT (Reasons)

- Ignore linter warnings
- Commit code with TypeScript errors
- Skip code reviews
- Merge PRs with failing checks
- Disable quality tools without reason
- Leave TODO comments indefinitely

## Quality Checklist

Before every commit:

- [ ] Code passes TypeScript compilation
- [ ] ESLint shows no errors
- [ ] Code is formatted with Prettier
- [ ] Tests pass
- [ ] No console.logs in production code
- [ ] Types are properly defined
- [ ] Code is documented where needed

Before every PR:

- [ ] All CI checks pass
- [ ] Codacy shows no new issues
- [ ] Test coverage maintained or improved
- [ ] Code reviewed by at least one person
- [ ] Changes are documented
- [ ] No merge conflicts in pull request
