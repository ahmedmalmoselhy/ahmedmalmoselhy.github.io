# Ahmed AlMoselhy - Personal Portfolio

A modern, interactive portfolio website showcasing projects, skills, and GitHub contributions. Built with cutting-edge front-end technologies for a seamless user experience.

## 🎯 About

This is the personal portfolio of Ahmed AlMoselhy, a Full-Stack Software Engineer specializing in building exceptional digital experiences with a focus on accessible, human-centered products. The portfolio features detailed project showcases, technical skills, professional experience, and an interactive GitHub contribution graph.

## ✨ Features

- **Interactive UI**: Smooth animations, transitions, and hover effects throughout
- **Project Showcase**: Detailed project cards with images, descriptions, technologies, and links
- **Skills Visualization**: Radar chart displaying technical proficiency across various technologies
- **GitHub Activity**: Real-time GitHub contribution graph fetched from the GitHub API
- **Responsive Design**: Fully responsive layout optimized for all device sizes
- **Dark Mode Support**: Built-in theme toggle for light/dark mode
- **Single Page Application**: Fast navigation without page reloads
- **Contact Form**: Direct contact section with form validation
- **Social Links**: Quick access to GitHub, LinkedIn, and other professional profiles

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + custom portfolio theme
- **UI Components**: shadcn-ui (Radix UI + Tailwind)
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Charting**: Recharts (for skills radar)
- **HTTP Client**: Fetch API
- **Linting**: ESLint
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ui/              # shadcn-ui components
│   ├── GitHubGraph.tsx  # GitHub contributions visualization
│   ├── Navbar.tsx       # Navigation bar
│   ├── Footer.tsx       # Footer section
│   └── ...
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   ├── Projects.tsx     # Projects listing
│   ├── Skills.tsx       # Skills showcase
│   ├── Contact.tsx      # Contact form
│   └── ...
├── data/                # Static data
│   ├── projects.ts      # Project definitions
│   ├── experience.ts    # Experience data
│   └── certifications.ts # Certifications
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or bun package manager

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ahmedmalmoselhy/ahmedmalmoselhy.github.io.git
    cd ahmedmalmoselhy.github.io
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    bun install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    bun run dev
    ```

The app will be available at `http://localhost:5173/`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🌐 Key Components

### GitHub Graph

Interactive contribution graph that displays real-time data from GitHub API with:

- Daily contribution heatmap
- Month and day labels
- Contribution count legend
- Hover tooltips with detailed information

### Skills Radar Chart

Visual representation of technical proficiency across multiple domains:

- Full-stack development
- Frontend technologies
- Backend frameworks
- Databases and tools

### Project Cards

Detailed project showcases featuring:

- Project images and descriptions
- Technology stack badges
- Status indicators (completed, in-progress, etc.)
- Links to GitHub repositories and live demos

## 🎨 Customization

The portfolio uses a custom Tailwind CSS theme defined in `tailwind.config.ts` with portfolio-specific colors:

- `portfolio-highlight`: Primary accent color
- `portfolio-navy`: Dark background
- `portfolio-slate`: Text and borders
- `portfolio-white`: Light text
- `portfolio-lightSlate`: Secondary text

## 📱 Responsive Breakpoints

- Mobile: Base styles
- Tablet: `sm:` and `md:` breakpoints
- Desktop: `lg:` and larger breakpoints

## 🔄 GitHub Integration

The portfolio fetches real-time GitHub contribution data using the [GitHub Contributions API](https://github-contributions-api.jogruber.de/). The contribution graph automatically updates and displays:

- Last year's contributions
- Daily activity heatmap
- Contribution intensity levels

## 📧 Contact

For inquiries or collaboration opportunities, visit the Contact section on the portfolio or reach out via:

- Email: <ahmedalmoselhy.slm@gmail.com>
- GitHub: [@ahmedmalmoselhy](https://github.com/ahmedmalmoselhy)
- LinkedIn: [Ahmed AlMoselhy](https://www.linkedin.com/in/ahmedmalmoselhy/)

## 📄 License

This project is open source and available under the MIT License.

---

**Live Portfolio**: [ahmedmalmoselhy.github.io](https://ahmedmalmoselhy.github.io)
