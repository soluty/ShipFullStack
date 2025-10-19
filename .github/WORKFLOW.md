# 🔄 Automatic Deployment Workflow Guide

## Workflow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Git Push to Main                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Detect Changes (detect-changes)                 │
│  Detects which app files have changed                       │
│  - apps/web/** → web output                                 │
│  - apps/server/** → server output                           │
└──────────┬──────────────────────┬───────────────────────────┘
           │                      │
           ▼                      ▼
┌──────────────────┐    ┌──────────────────┐
│  Deploy Web App  │    │ Deploy Server    │
│                  │    │                  │
│  If web changed  │    │ If server changed│
│  or manual run   │    │ or manual run    │
└──────────┬───────┘    └───────┬──────────┘
           │                    │
           └─────────┬──────────┘
                     ▼
           ┌─────────────────┐
           │ Deployment      │
           │ Summary         │
           │                 │
           │ Shows status    │
           │ of each app     │
           └─────────────────┘
```

## Two Main Workflows

### 1. `deploy.yml` - Production Deployment

**Trigger Conditions**:
- Push to `main` or `master` branch
- Manual trigger (workflow_dispatch)

**Execution Steps**:
1. **detect-changes**: Detect file changes
2. **deploy-web**: Deploy web app if web files changed
3. **deploy-server**: Deploy server app if server files changed
4. **notify**: Generate deployment summary

**Smart Features**:
- ✅ Only deploy apps with changes (saves time and resources)
- ✅ Parallel execution of independent deployment tasks
- ✅ Automatic deployment summary report generation

### 2. `preview.yml` - PR Preview Check

**Trigger Conditions**:
- Pull Request opened, synchronized, or reopened

**Execution Steps**:
1. **detect-changes**: Detect file changes
2. **build-and-test**: 
   - Type checking (type check)
   - Code format checking (lint)
   - Build testing (build)

**Purpose**:
- 🛡️ Prevent breaking code from merging to main branch
- 📊 Display build status in PR
- ⚡️ Quick feedback on code quality

## File Change Detection Rules

```yaml
web:
  - 'apps/web/**'      # All web app files
  - 'package.json'     # Root dependency changes
  - 'pnpm-lock.yaml'   # Dependency lock file changes

server:
  - 'apps/server/**'   # All server app files
  - 'package.json'     # Root dependency changes
  - 'pnpm-lock.yaml'   # Dependency lock file changes
```

## Usage Scenarios

### Scenario 1: Only Modify Frontend Code
```bash
# Modify web app
vim apps/web/src/pages/dashboard.tsx
git add apps/web/
git commit -m "feat: update dashboard"
git push
```
**Result**: ✅ Only deploys web app (~3-5 minutes)

### Scenario 2: Only Modify Backend Code
```bash
# Modify server API
vim apps/server/src/api/users.ts
git add apps/server/
git commit -m "feat: add user endpoint"
git push
```
**Result**: ✅ Only deploys server app (~2-3 minutes)

### Scenario 3: Modify Both Frontend and Backend
```bash
# Modify multiple apps
git add apps/web/ apps/server/
git commit -m "feat: update user feature"
git push
```
**Result**: ✅ Deploys both apps in parallel (~5-7 minutes)

### Scenario 4: Manual Full Deployment
```bash
# In GitHub Actions interface
# 1. Go to Actions tab
# 2. Select "Deploy to Cloudflare"
# 3. Click "Run workflow"
# 4. Select branch and run
```
**Result**: ✅ Deploys all apps regardless of changes

## Deployment Time Estimates

| Scenario | Estimated Time |
|----------|----------------|
| Deploy Web Only | 3-5 minutes |
| Deploy Server Only | 2-3 minutes |
| Deploy Both | 5-7 minutes |
| PR Build Check | 2-4 minutes |

## Monitoring and Debugging

### View Real-time Logs
1. Go to GitHub repository
2. Click **Actions** tab
3. Select the running workflow
4. Click specific job to view detailed logs

### Handle Deployment Failures
1. **View error logs**: Click on the failed step in Actions
2. **Common issues**:
   - API Token expired → Regenerate and update Secret
   - Insufficient permissions → Check Token permission configuration
   - Build failure → Run `pnpm run build` locally to test

### Rollback to Previous Version
```bash
# Use wrangler to rollback
cd apps/web
wrangler rollback

cd apps/server
wrangler rollback
```

## Environment Variable Configuration

### Required GitHub Secrets
| Secret | Description | How to Obtain |
|--------|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | API access token | Cloudflare Dashboard |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID | Cloudflare Dashboard |

### Optional Secrets (for syncing secrets)
| Secret | Description |
|--------|-------------|
| `DATABASE_URL` | Database connection |
| `DATABASE_URL_POOLER` | Database connection pool |
| `BETTER_AUTH_SECRET` | Authentication secret |

## Security Best Practices

1. ✅ **Use principle of least privilege**: Grant API Token only necessary permissions
2. ✅ **Rotate secrets regularly**: Update API Token every 3-6 months
3. ✅ **Enable branch protection**: Require PR review before merging to main
4. ✅ **Monitor deployment activities**: Regularly check Actions logs
5. ✅ **Protect environment variables**: Never hardcode secrets in code

## Troubleshooting Checklist

- [ ] Are GitHub Secrets configured correctly?
- [ ] Is Cloudflare API Token valid?
- [ ] Can you build successfully locally?
- [ ] Are environment variable files configured correctly?
- [ ] Is wrangler.jsonc configured correctly?
- [ ] Is network connection normal?

## Performance Optimization Suggestions

1. **Dependency caching**: Workflow has enabled pnpm caching
2. **Parallel builds**: Multiple apps deploy in parallel
3. **Conditional deployment**: Only deploy apps with changes
4. **Timeout limits**: Set reasonable timeout to prevent resource waste

## Advanced Usage

### Customize Deployment Conditions
Edit the filters configuration in `.github/workflows/deploy.yml`:

```yaml
filters: |
  web:
    - 'apps/web/**'
    - 'packages/ui/**'  # Add shared UI package
  server:
    - 'apps/server/**'
    - 'packages/shared/**'  # Add shared code package
```

### Add Deployment Notifications
You can add Slack, Discord, or Email notifications in the workflow:

```yaml
- name: Notify Slack
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "✅ Deployment successful!"
      }
```

---

**Tip**: These workflow files can all be customized according to your needs!
