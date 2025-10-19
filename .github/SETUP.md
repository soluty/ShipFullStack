# 🚀 Quick Setup for Auto Deployment

## One-Click Setup Steps

### 1️⃣ Get Cloudflare Credentials

Open your terminal and follow these instructions:

```bash
# Get Account ID
# Visit https://dash.cloudflare.com → Select any site → Find Account ID on the right

# Create API Token
# Visit https://dash.cloudflare.com/profile/api-tokens
# Click "Create Token" → Use the "Edit Cloudflare Workers" template
```

### 2️⃣ Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:

```
CLOUDFLARE_API_TOKEN=your_API_Token
CLOUDFLARE_ACCOUNT_ID=your_Account_ID
```

### 3️⃣ Test Auto Deployment

```bash
# Create a test commit
git add .
git commit -m "test: setup auto deployment"
git push origin main
```

Then visit your GitHub repository's **Actions** tab to view deployment progress.

## 📋 Complete Secrets Checklist

| Secret Name | Required | Description |
|-------------|----------|-------------|
| `CLOUDFLARE_API_TOKEN` | ✅ | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | ✅ | Cloudflare Account ID |

## 🔍 Verify Configuration

After configuration is complete, you can:

1. **View deployment history**: Visit GitHub Actions tab
2. **Manually trigger deployment**: Click "Run workflow" in Actions
3. **Monitor deployment status**: Check Actions run status after each push

## ⚡️ Workflow Features

### Main Branch Auto Deployment (`deploy.yml`)
- ✅ Smart file change detection
- ✅ Only deploy modified applications
- ✅ Parallel deployment for faster speed
- ✅ Deployment summary and notifications

### PR Preview Check (`preview.yml`)
- ✅ Automatic build checks
- ✅ Type checking
- ✅ Code format checking
- ✅ Prevent breaking changes

## 🎯 Usage Tips

### Deploy Specific Applications Only

```bash
# Only modify web app code
git add apps/web/
git commit -m "feat: update web app"
git push  # Only deploys web app

# Only modify server app code
git add apps/server/
git commit -m "feat: update server"
git push  # Only deploys server app
```

### Force Full Deployment

```bash
# Modifying root package.json triggers full deployment
git add package.json
git commit -m "chore: update dependencies"
git push  # Deploys both web and server
```

### Manually Trigger Deployment

1. Visit GitHub Actions
2. Select "Deploy to Cloudflare"
3. Click "Run workflow"
4. Select branch and run

## 🔧 Troubleshooting

### Deployment Failed?

1. **Check Secrets configuration**: Ensure API Token and Account ID are correct
2. **View detailed logs**: Click on the failed workflow in Actions to view logs
3. **Verify local deployment**: Run `pnpm run deploy` to test local deployment

### API Token Insufficient Permissions?

Ensure your API Token includes the following permissions:
- Account Settings: Read
- Workers Scripts: Edit
- Workers KV Storage: Edit

### Deployment Successful But Site Inaccessible?

1. Check Cloudflare Workers configuration
2. Verify environment variables are correct
3. Check deployment status in Cloudflare Dashboard

## 📚 More Resources

- [Detailed Deployment Documentation](./.github/DEPLOYMENT.md)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Tip**: After configuration is complete, you can delete the `scripts/deploy-all.mjs` script and use git push for fully automatic deployment!
