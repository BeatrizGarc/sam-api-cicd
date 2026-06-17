# 🚀 SAM API REST with CI/CD Pipeline

![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-blue)
![AWS SAM](https://img.shields.io/badge/AWS-SAM-FF9900)
![Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900)
![DynamoDB](https://img.shields.io/badge/AWS-DynamoDB-FF9900)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

A serverless **REST API** built with **AWS SAM** and deployed with **GitHub Actions CI/CD pipeline**. This project demonstrates modern DevOps practices with automated testing, multiple environments, and manual approval gates.

**Live API**: https://qnjz0exctc.execute-api.us-east-1.amazonaws.com/Prod/

---

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Pipeline Stages](#pipeline-stages)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

✅ **Serverless Architecture** - No servers to manage  
✅ **Microservices Design** - Separate Lambda functions per endpoint  
✅ **Full CI/CD Pipeline** - Automated testing and deployment  
✅ **Multiple Environments** - Testing and production stacks  
✅ **Manual Approval Gate** - Review before production deployment  
✅ **Integration Tests** - Automated API testing  
✅ **Infrastructure as Code** - Define resources in SAM templates  
✅ **DynamoDB Backend** - NoSQL database for todo items  

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                       │
│                    (push to main branch)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  GitHub Actions Pipeline                    │
├─────────────────────────────────────────────────────────────┤
│  1️⃣  Unit Tests          ✅ Run test suite                 │
│  2️⃣  Build & Package      ✅ Compile SAM template          │
│  3️⃣  Deploy Testing       ✅ Create dev environment        │
│  4️⃣  Integration Tests    ✅ Test real API endpoints       │
│  5️⃣  Manual Review        ⏸️  Wait for approval            │
│  6️⃣  Deploy Production    ✅ Update prod environment       │
│  7️⃣  Cleanup              ✅ Remove dev stack              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Environment                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ API Gateway  │─→│  Lambda      │─→│  DynamoDB    │      │
│  │              │  │  Functions   │  │  Table       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│       (3 Methods)      (3 Handlers)                          │
│    • GET  /                                                  │
│    • GET  /{id}                                              │
│    • POST /                                                  │
└─────────────────────────────────────────────────────────────┘
```

### Key AWS Components

| Component | Purpose | Details |
|-----------|---------|---------|
| **API Gateway** | REST API Endpoint | Public HTTPS interface |
| **Lambda Functions** | Business Logic | 3 serverless functions |
| **DynamoDB** | Database | NoSQL table for data |
| **CloudFormation** | Infrastructure | Stack management |
| **IAM Role** | Security | LabRole for permissions |

---

## 🚀 Quick Start

### Prerequisites

- Git installed
- AWS credentials (Access Key ID, Secret Key, Session Token)
- Node.js 18+ for local testing
- AWS SAM CLI for local deployment

### 1. Clone the Repository

```bash
git clone https://github.com/BeatrizGarc/sam-api-cicd.git
cd sam-api-cicd
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set AWS Credentials

Configure your AWS credentials as environment variables or in `~/.aws/credentials`:

```bash
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_SESSION_TOKEN="your_session_token"
```

### 4. Run Unit Tests Locally

```bash
npm run test
```

### 5. Build and Deploy Locally

```bash
sam build --template template.yaml
sam deploy --guided
```

---

## 🔗 API Endpoints

### GET / - Get All Items

Retrieve all items from the database.

**Request:**
```bash
curl https://qnjz0exctc.execute-api.us-east-1.amazonaws.com/Prod/
```

**Response:**
```json
{
  "message": "Items obtenidos exitosamente del servidor",
  "items": [
    {
      "id": "1",
      "name": "Sample Item 1"
    },
    {
      "id": "2",
      "name": "Sample Item 2"
    }
  ],
  "timestamp": "2026-06-17T10:20:07.121Z"
}
```

---

### POST / - Create New Item

Add a new item to the database.

**Request:**
```bash
curl -X POST https://qnjz0exctc.execute-api.us-east-1.amazonaws.com/Prod/ \
  -H "Content-Type: application/json" \
  -d '{
    "id": "3",
    "name": "New Item"
  }'
```

**Response:**
```json
{
  "message": "Item creado exitosamente",
  "item": {
    "id": "3",
    "name": "New Item"
  },
  "timestamp": "2026-06-17T10:22:15.456Z"
}
```

---

### GET /{id} - Get Item by ID

Retrieve a specific item by its ID.

**Request:**
```bash
curl https://qnjz0exctc.execute-api.us-east-1.amazonaws.com/Prod/1
```

**Response:**
```json
{
  "message": "Item obtenido exitosamente",
  "item": {
    "id": "1",
    "name": "Sample Item 1"
  },
  "timestamp": "2026-06-17T10:24:30.789Z"
}
```

---

## 🔄 Pipeline Stages

### 1. **Unit Tests** (5-10 min)
- Runs Jest test suite
- Validates code before compilation
- Fails pipeline if tests don't pass

### 2. **Build & Package** (10-15 min)
- Compiles TypeScript/JavaScript with SAM
- Creates deployment artifacts
- Generates CloudFormation templates

### 3. **Deploy Testing** (5-10 min)
- Creates `todo-app-dev` stack in AWS
- Deploys 3 Lambda functions and DynamoDB table
- Outputs testing API endpoint

### 4. **Integration Tests** (3-5 min)
- Calls real API endpoints in testing environment
- Validates response structure
- Ensures functionality works end-to-end

### 5. **Manual Review** ⏸️
- Pipeline waits for human approval
- Only BeatrizGarc can approve
- Prevents accidental production deployments

### 6. **Deploy Production** (5-10 min)
- Creates `todo-app-prod` stack
- Updates production API Gateway
- Same resources as testing environment

### 7. **Cleanup** (2-5 min)
- Automatically removes `todo-app-dev` stack
- Saves AWS costs
- Keeps only production running

---

## 💻 Local Development

### Project Structure

```
sam-api-cicd/
├── .github/
│   └── workflows/
│       └── pipeline.yaml           # GitHub Actions workflow
├── src/
│   └── handlers/
│       ├── get-all-items.mjs       # Lambda: GET /
│       ├── get-by-id.mjs           # Lambda: GET /{id}
│       └── put-item.mjs            # Lambda: POST /
├── __tests__/
│   ├── unit/
│   │   └── handlers/
│   │       ├── get-all-items.test.mjs
│   │       ├── get-by-id.test.mjs
│   │       └── put-item.test.mjs
│   └── integracion/
│       └── testapi.mjs             # Integration tests
├── events/                          # Sample Lambda events
├── package.json
├── template.yaml                   # SAM infrastructure definition
└── README.md                        # This file
```

### Run Tests

**Unit Tests:**
```bash
npm run test
```

**Integration Tests** (requires deployed API):
```bash
export ApiUrl="https://your-api-endpoint/"
npm run integracion
```

### Local SAM Development

**Build:**
```bash
sam build --template template.yaml --use-container
```

**Local Invoke:**
```bash
sam local invoke getAllItemsFunction --event events/event.json
```

**Start Local API:**
```bash
sam local start-api
```

Then test locally at `http://127.0.0.1:3000/`

---

## 📦 Deployment

### Automatic Deployment (via GitHub Actions)

1. Make code changes
2. Commit and push to `main` branch
3. Pipeline executes automatically
4. Approve production deployment when prompted
5. API updates automatically

### Manual Deployment

```bash
sam build --template template.yaml --use-container

# Testing environment
sam deploy \
  --stack-name todo-app-dev \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM

# Production environment
sam deploy \
  --stack-name todo-app-prod \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM
```

---

## 🧪 Testing

### Unit Tests

Jest tests validate Lambda handler logic without AWS calls.

```bash
npm run test
```

Tests cover:
- ✅ getAllItemsFunction response structure
- ✅ getByIdFunction error handling
- ✅ putItemFunction data validation

### Integration Tests

Real API endpoint testing to ensure end-to-end functionality.

```bash
npm run integracion
```

Tests verify:
- ✅ GET / returns items array
- ✅ POST / creates new item
- ✅ GET /{id} retrieves specific item
- ✅ Response structure matches expected format

---

## ⚙️ Configuration

### GitHub Secrets

Required for CI/CD pipeline to authenticate with AWS:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS programmatic access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_SESSION_TOKEN` | Temporary session token (AWS Academy) |

**Note**: Session tokens expire every 4-6 hours in AWS Academy. Update secrets when session expires.

### GitHub Environment

The `testenv` environment requires manual approval before production deployment:

1. Go to **Settings** → **Environments** → **testenv**
2. Enable **Required reviewers**
3. Reviewer must approve to proceed with production deployment

---

## 🐛 Troubleshooting

### Pipeline Fails on Integration Tests

**Error**: `AssertionError: Expected values to be strictly deep-equal`

**Solution**: Ensure response structure matches test expectations:
```javascript
// ✅ Correct structure
{
  message: "...",
  items: [...],
  timestamp: "..."
}

// ❌ Wrong - test expects object, not array
[...]
```

### AWS Credentials Expired

**Error**: `UnauthorizedOperation` or similar AWS errors

**Solution**: Update GitHub Secrets with new credentials:
1. Get new credentials from AWS Academy
2. Go to repository **Settings** → **Secrets and variables**
3. Update the three AWS secrets
4. Restart the pipeline

### DynamoDB Table Access Denied

**Error**: `User is not authorized to perform action 'dynamodb:...'`

**Solution**: Ensure `LabRoleArn` is correctly set. Update in workflow or AWS IAM.

### Local SAM Build Fails

**Error**: Docker not found

**Solution**: Install Docker or use `--use-container` flag:
```bash
sam build --template template.yaml
```

---

## 📊 Monitoring

### GitHub Actions

View pipeline execution:
1. Go to repository
2. Click **Actions** tab
3. See all workflow runs and logs

### AWS CloudFormation

Check deployed resources:
1. AWS Console → CloudFormation
2. View stack: `todo-app-prod` (production) or `todo-app-dev` (testing)
3. Check resources, events, outputs

### AWS Lambda

Monitor function invocations:
1. AWS Console → Lambda
2. Select function
3. View CloudWatch Logs

---

## 📄 License

This project is provided as-is for educational purposes.

---

## 👤 Author

**BeatrizGarc**

- GitHub: https://github.com/BeatrizGarc
- Repository: https://github.com/BeatrizGarc/sam-api-cicd

---

## 📚 Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [DynamoDB Developer Guide](https://docs.aws.amazon.com/dynamodb/latest/developerguide/)
- [API Gateway User Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/)

---

**Last Updated**: June 17, 2026  
**API Status**: ✅ Active and Running  
**Pipeline Status**: ✅ Automated CI/CD Active

