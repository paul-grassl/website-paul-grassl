# GitHub Copilot Instructions for website-paul-grassl

## Project Overview
This is an Astro-based portfolio website for Paul Grassl showcasing artworks and exhibitions.

## Tech Stack
- **Framework**: Astro
- **Styling**: CSS (custom styles in src/styles/)
- **Package Manager**: pnpm
- **Deployment**: Netlify

## Code Style & Conventions

### Astro Components
- Use `.astro` file extension for Astro components
- Follow Astro's component structure: frontmatter (---), then template
- Prefer static generation over SSR when possible
- Use TypeScript for type safety in frontmatter
- Implement proper component composition and reusability
- Use Astro.props for passing data to components

### File Organization
- Components go in `src/components/`
- Pages go in `src/pages/`
- Data files go in `src/data/`
- Public assets go in `public/assets/`

### Routing
- Utilize file-based routing in `src/pages/`
- Use `[param].astro` for dynamic routes
- Use `[...slug].astro` for catch-all routes
- Implement `getStaticPaths()` for dynamic route generation
- Handle 404s with `404.astro`

### Naming Conventions
- Components: PascalCase (e.g., `BackButton.astro`)
- Pages: lowercase with hyphens (e.g., `about.md`)
- Data files: descriptive names in lowercase

### TypeScript
- Use TypeScript for type definitions
- Define types inline or in separate `.d.ts` files
- Leverage Astro's built-in TypeScript support

### Styling
- Use global styles from `src/styles/global.css`
- Typography styles in `src/styles/typography.css`
- Prefer semantic HTML and modern CSS features
- Use CSS custom properties for theming

### Content Management
- Exhibition data in `src/data/exhibitions/`
- Work data in `src/data/works/`
- Use structured data files (JSON/YAML) for content
- Leverage Markdown (.md) files for content-heavy pages
- Use frontmatter in Markdown files for metadata

### Data Fetching
- Use `Astro.props` for passing data to components
- Use `getStaticPaths()` for build-time data fetching
- Use `Astro.glob()` for working with local files
- Implement proper error handling for data operations

## Best Practices
1. Keep components simple and focused
2. Use Astro's built-in image optimization
3. Leverage static site generation for performance
4. Follow accessibility guidelines
5. Optimize assets before adding to public folder
6. Use semantic HTML elements
7. Keep frontmatter logic minimal

## Performance Optimization
- Minimize client-side JavaScript; prefer static generation
- Use client:* directives judiciously for partial hydration:
  - `client:load` - for immediately needed interactivity
  - `client:idle` - for non-critical interactivity  
  - `client:visible` - for components that hydrate when visible
- Implement lazy loading for images and assets
- Leverage Astro's built-in asset optimization

## SEO & Accessibility
- Use proper semantic HTML structure
- Implement meta tags and canonical URLs
- Ensure keyboard navigation for interactive elements
- Use ARIA attributes where necessary
- Optimize for Core Web Vitals (LCP, FID, CLS)

## Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## References
- Check README.md for detailed project documentation
- Astro documentation: https://docs.astro.build
