.PHONY: help dev build test test-coverage lint lint-fix clean preview install

# Color output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help:
	@echo "$(BLUE)Ongevag Studio Portfolio — Makefile$(NC)"
	@echo ""
	@echo "$(YELLOW)Development:$(NC)"
	@echo "  make dev              Start Vite dev server (localhost:5173)"
	@echo "  make build            Build for production (dist/)"
	@echo "  make preview          Preview production build locally"
	@echo ""
	@echo "$(YELLOW)Quality:$(NC)"
	@echo "  make lint             Run ESLint analysis"
	@echo "  make lint-fix         Fix ESLint issues automatically"
	@echo "  make test             Run test suite (Vitest)"
	@echo "  make test-coverage    Run tests with coverage report"
	@echo ""
	@echo "$(YELLOW)Utilities:$(NC)"
	@echo "  make install          Install dependencies (npm)"
	@echo "  make clean            Remove build artifacts (dist/, coverage/)"
	@echo "  make sitemap          Generate sitemap.xml"
	@echo ""
	@echo "$(YELLOW)Database/Infra:$(NC)"
	@echo "  make deploy-vercel    Deploy to Vercel (if configured)"
	@echo ""

## Development commands

dev:
	@echo "$(GREEN)▶ Starting Vite dev server...$(NC)"
	npm run dev

build:
	@echo "$(GREEN)▶ Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete. Output in dist/$(NC)"

preview:
	@echo "$(GREEN)▶ Previewing production build...$(NC)"
	npm run preview

## Quality & Testing

lint:
	@echo "$(GREEN)▶ Running ESLint...$(NC)"
	npm run lint

lint-fix:
	@echo "$(GREEN)▶ Fixing ESLint issues...$(NC)"
	npx eslint . --fix

test:
	@echo "$(GREEN)▶ Running tests (Vitest)...$(NC)"
	npm run test

test-coverage:
	@echo "$(GREEN)▶ Running tests with coverage...$(NC)"
	npm run test:coverage
	@echo "$(GREEN)✓ Coverage report: $(NC)coverage/index.html"

## Utilities

install:
	@echo "$(GREEN)▶ Installing dependencies...$(NC)"
	npm install

clean:
	@echo "$(GREEN)▶ Cleaning build artifacts...$(NC)"
	rm -rf dist/ coverage/ .next/ .vuepress/dist/ .cache/
	@echo "$(GREEN)✓ Clean complete.$(NC)"

sitemap:
	@echo "$(GREEN)▶ Generating sitemap.xml...$(NC)"
	npm run generate-sitemap
	@echo "$(GREEN)✓ Sitemap generated.$(NC)"

## Combined targets

install-dev: install
	@echo "$(GREEN)✓ Dependencies installed. Run 'make dev' to start.$(NC)"

check: lint test
	@echo "$(GREEN)✓ All checks passed.$(NC)"

# Phased approach for increasing test coverage (Phase 2-3)
test-phase-1:
	@echo "$(YELLOW)Phase 1: Testing UC-01 (Contact Form)...$(NC)"
	npm run test -- src/features/contact/__tests__/
	npm run test:coverage -- src/features/contact/

test-phase-2:
	@echo "$(YELLOW)Phase 2: Testing UC-02 (Blog) + UC-03 (Projects)...$(NC)"
	npm run test -- src/features/blog/__tests__/ src/pages/__tests__/
	npm run test:coverage

test-phase-3:
	@echo "$(YELLOW)Phase 3: Testing UC-04 (Performance) + Full suite...$(NC)"
	npm run test:coverage
	@echo "$(GREEN)✓ Full coverage report available: coverage/index.html$(NC)"

# Deployment helpers

deploy-vercel:
	@echo "$(YELLOW)Note: Vercel deploys automatically on push to main/develop.$(NC)"
	@echo "See vercel.json for configuration."

## Git workflows (optional, convenience)

branch-feature:
	@echo "$(BLUE)Creating feature branch...$(NC)"
	git checkout -b feature/your-feature-name

branch-fix:
	@echo "$(BLUE)Creating fix branch...$(NC)"
	git checkout -b fix/your-fix-name

## Documentation

docs-serve:
	@echo "$(YELLOW)Docs not yet hosted. See docs/ directory.$(NC)"

## Docker (optional, if using)

# docker-build:
# 	docker build -t ongevag-portfolio .
# docker-run:
# 	docker run -p 3000:5173 ongevag-portfolio

## CI/CD helpers

ci-test:
	@echo "$(GREEN)▶ Running CI test suite...$(NC)"
	npm run lint && npm run test:coverage

ci-build:
	@echo "$(GREEN)▶ Running CI build...$(NC)"
	npm run build

## Advanced targets

analyze-bundle:
	@echo "$(YELLOW)Bundle analysis (manual):$(NC)"
	@echo "  1. npm run build"
	@echo "  2. Check dist/ file sizes"
	@echo "  3. For detailed analysis, use: npx vite-bundle-visualizer"

performance-audit:
	@echo "$(YELLOW)Performance audit (manual):$(NC)"
	@echo "  1. npm run build && npm run preview"
	@echo "  2. Run: npx lighthouse http://localhost:5173 --output-path=./audit.html"
	@echo "  3. Check metrics: LCP, FID, CLS"

## Info targets

info:
	@echo "$(BLUE)Project Info:$(NC)"
	@echo "  Name:      Ongevag Studio Portfolio"
	@echo "  Stack:     React 19 + Vite 6.3.5"
	@echo "  Package:   npm (package.json)"
	@echo "  Deploy:    Vercel"
	@echo "  Repo:      Git (develop/main)"

version:
	@grep '"version"' package.json

.DEFAULT_GOAL := help
