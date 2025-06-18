# 🚀 Ahmed Gharbi - Portfolio Website

A modern, interactive portfolio website showcasing my skills as a Software Engineer and Cloud Architect. Built with cutting-edge technologies and featuring advanced animations, sound effects, and responsive design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-cyan)

## ✨ Features

### 🎨 **Modern Design**
- **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Glassmorphism Effects** - Modern UI with backdrop blur and transparency
- **Gradient Animations** - Dynamic color transitions and hover effects

### 🎭 **Interactive Elements**
- **Particle Background** - Animated particle system with theme-aware colors
- **3D Scene Effects** - Pseudo-3D particle animations
- **Advanced Cursor** - Custom cursor with hover and click animations
- **Floating Elements** - Animated tech icons floating across the screen
- **Typing Animation** - Dynamic text animation for role descriptions

### 🔊 **Audio Experience**
- **Sound Effects** - Hover, click, navigation, and theme switch sounds
- **Web Audio API** - Custom sound generation without external files
- **Sound Toggle** - Enable/disable audio with user preference saving

### ⌨️ **Keyboard Navigation**
- **Keyboard Shortcuts** - Quick navigation with H, A, S, P, E, C keys
- **Theme Toggle** - Press 'T' to switch themes
- **Sound Toggle** - Press 'M' to toggle audio
- **Help Modal** - Press '?' to view all shortcuts

### 📱 **Mobile Gestures**
- **Swipe Navigation** - Swipe up/down to navigate between sections
- **Haptic Feedback** - Vibration feedback on supported devices
- **Touch Optimized** - Enhanced touch interactions

### 📊 **Data Visualization**
- **Skill Radar Chart** - Interactive radar chart showing technical skills
- **Progress Animations** - Animated skill level indicators
- **Interactive Timeline** - Expandable work experience timeline
- **Achievement Badges** - Animated certification and achievement cards

### 🎯 **Performance**
- **Performance Monitor** - Real-time FPS, load time, and memory usage display
- **Optimized Animations** - Smooth 60fps animations with proper cleanup
- **Lazy Loading** - Efficient resource loading
- **SEO Optimized** - Meta tags and structured data

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks and context
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### **UI Components**
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variant management

### **Features**
- **Web Audio API** - Custom sound generation
- **Canvas API** - Particle animations and radar chart
- **Intersection Observer** - Scroll-triggered animations
- **Local Storage** - Theme and preference persistence

### **Form Handling**
- **Formspree** - Contact form backend service
- **Server Actions** - Next.js server-side form processing
- **Email Integration** - Direct email functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/GharbiiAhmed/portfolio.git
cd portfolio
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your environment variables:
\`\`\`env
# Formspree (for contact form)
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint

# Email service (optional)
RESEND_API_KEY=your_resend_api_key
\`\`\`

4. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
portfolio/
├── app/                    # Next.js App Router
│   ├── actions/           # Server actions
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main portfolio page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── particle-background.tsx
│   ├── sound-manager.tsx
│   ├── advanced-cursor.tsx
│   ├── typing-animation.tsx
│   ├── skill-radar.tsx
│   ├── interactive-timeline.tsx
│   ├── project-modal.tsx
│   ├── contact-form.tsx
│   ├── keyboard-shortcuts.tsx
│   └── ...
├── public/               # Static assets
│   ├── Ahmed_Gharbi_Resume.pdf
│   └── ...
├── lib/                  # Utility functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── ...
\`\`\`

## 🎮 Interactive Features

### **Keyboard Shortcuts**
| Key | Action |
|-----|--------|
| `H` | Navigate to Hero section |
| `A` | Navigate to About section |
| `S` | Navigate to Skills section |
| `P` | Navigate to Projects section |
| `E` | Navigate to Experience section |
| `C` | Navigate to Contact section |
| `T` | Toggle theme (Dark/Light) |
| `M` | Toggle sound effects |
| `?` | Show keyboard shortcuts help |

### **Mobile Gestures**
- **Swipe Up** - Next section
- **Swipe Down** - Previous section
- **Swipe Left/Right** - Theme toggle

### **Sound Effects**
- **Hover** - Subtle hover feedback
- **Click** - Button and link clicks
- **Navigation** - Section navigation
- **Theme Switch** - Theme toggle confirmation
- **Success** - Form submission success

## 🎨 Customization

### **Theme Colors**
Edit `tailwind.config.ts` to customize the color scheme:

\`\`\`typescript
theme: {
  extend: {
    colors: {
      purple: {
        // Custom purple shades
      },
      blue: {
        // Custom blue shades
      }
    }
  }
}
\`\`\`

### **Content Updates**
Update personal information in `app/page.tsx`:

\`\`\`typescript
// Personal information
const personalInfo = {
  name: "Your Name",
  email: "your.email@example.com",
  phone: "+1234567890",
  location: "Your Location",
  // ...
}

// Skills, projects, experience, etc.
\`\`\`

### **Sound Customization**
Modify sound frequencies and durations in `components/sound-manager.tsx`:

\`\`\`typescript
// Custom sound functions
const playCustomSound = (frequency: number, duration: number) => {
  // Your custom sound logic
}
\`\`\`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Performance Optimization

### **Implemented Optimizations**
- **Code Splitting** - Automatic with Next.js
- **Image Optimization** - Next.js Image component
- **Animation Cleanup** - Proper cleanup of intervals and animations
- **Lazy Loading** - Components load when needed
- **Memoization** - React.memo and useMemo where appropriate

### **Performance Monitoring**
Real-time performance metrics displayed in development:
- **FPS Counter** - Animation frame rate
- **Load Time** - Page load performance
- **Memory Usage** - JavaScript heap size

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### **Other Platforms**
- **Netlify**: `npm run build && npm run export`
- **GitHub Pages**: Configure with GitHub Actions
- **Docker**: Use the included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About Me

**Ahmed Gharbi** - Certified Software Engineer & Cloud Architect

- 🌍 Based in Offenbach am Main, Germany
- 💼 3+ years experience in backend, cloud, DevOps, and IT support
- 🎓 Certified Kubernetes Administrator (CKA) & Application Developer (CKAD)
- ☁️ Google Cloud Professional Data Engineer
- 📧 Email: [aghx01@gmail.com](mailto:aghx01@gmail.com)
- 💼 LinkedIn: [ahmed-harley](https://www.linkedin.com/in/ahmed-harley/)
- 🐙 GitHub: [GharbiiAhmed](https://github.com/GharbiiAhmed)

## 🙏 Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **Framer Motion** - For smooth animations
- **Vercel** - For hosting and deployment
- **Formspree** - For contact form handling
- **Lucide** - For the icon library

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Ahmed Gharbi
