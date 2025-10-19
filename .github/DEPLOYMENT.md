# Automatic Deployment Configuration Guide

This project is configured with GitHub Actions for automatic deployment to Cloudflare. Every push to the `main` or `master` branch will automatically trigger the deployment process.

## 🚀 Quick Start

### 1. Get Cloudflare API Token

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click user avatar in the top right → **My Profile**
3. Select **API Tokens** from the left sidebar
4. Click **Create Token**
5. Use the **Edit Cloudflare Workers** template, or create a custom token with the following permissions:
   - Account Settings: Read
   - User Details: Read
   - Workers Scripts: Edit
   - Workers KV Storage: Edit
   - Workers Routes: Edit
   - Account Settings: Read

### 2. Get Cloudflare Account ID

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select any website
3. Find **Account ID** at the bottom of the **Overview** page on the right
4. Click the copy button

### 3. Configure GitHub Secrets

1. Open your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** to add the following secrets:

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token | See step 1 above |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID | See step 2 above |

### 4. Configure Database Secrets (Optional)

If your server needs to sync secrets to Cloudflare Workers, also add:

| Secret Name | Description |
|-------------|-------------|
| `DATABASE_URL` | Neon database connection string |
| `DATABASE_URL_POOLER` | Neon database connection pool string |
| `BETTER_AUTH_SECRET` | Better Auth secret key |

## 📋 Deployment Process

When you push code to the `main` or `master` branch, the following steps will be automatically executed:

1. ✅ Checkout code
2. ✅ Setup Node.js and pnpm environment
3. ✅ Install dependencies
4. ✅ Build web application
5. ✅ Deploy web application to Cloudflare
6. ✅ Deploy server application to Cloudflare
7. ✅ Sync server secrets (if configured)

## 🔧 Manual Deployment Trigger

Besides automatic deployment, you can also trigger manually:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to Cloudflare** workflow
3. Click the **Run workflow** button
4. Select a branch and confirm

## 📊 View Deployment Status

1. Go to the **Actions** tab in your GitHub repository
2. View the latest workflow run records
3. Click to view detailed logs

## 🔄 Rollback to Previous Version

If deployment fails, you can rollback using:

```bash
# Rollback web app
cd apps/web
wrangler rollback

# Rollback server app
cd apps/server
wrangler rollback
```

## 🛠️ Local Deployment Commands

If you still want to use local deployment commands:

```bash
# Deploy all applications
pnpm run deploy

# Deploy web only
pnpm run deploy:web

# Deploy server only
pnpm run deploy:server
```

## ⚠️ Important Notes

1. **Environment Variables**: Ensure production environment configurations in `apps/web/.env.production` and `apps/server/wrangler.jsonc` are correct
2. **Branch Protection**: Recommend setting up protection rules for the `main` branch, requiring PR review before merging
3. **Secret Security**: Never hardcode API tokens or other sensitive information in code
4. **Deployment Frequency**: Every push to the main branch triggers deployment, proceed with caution

## 🎯 Best Practices

1. **Use Pull Requests**: Merge code to main branch via PRs
2. **Test Before Deploy**: Ensure code passes local tests before pushing
3. **Check Deployment Logs**: Review GitHub Actions logs after deployment to confirm success
4. **Monitor Application**: Visit production URL after deployment to verify functionality

## 📚 Related Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
