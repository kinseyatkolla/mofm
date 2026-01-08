# Moving on from Metro

A Vue.js 3 frontend website built with modern best practices.

## Features

- Vue 3 with Composition API
- Vite for fast development and building
- Vue Router for navigation
- Mobile-first responsive design
- Smooth scrolling navigation
- Accessible and clean UI

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Set up Google Maps API for address autocomplete:
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
   - Enable the "Places API" in your Google Cloud Console
   - Create a `.env` file in the project root:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```
   - Note: The address lookup will still work with eligible addresses if no API key is provided, but will not show suggestions for non-eligible addresses.

3. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/       # Reusable Vue components
  │   ├── NavigationBar.vue
  │   └── Section.vue
  ├── views/           # Page components
  │   ├── Index.vue
  │   ├── FAQ.vue
  │   └── History.vue
  ├── router/          # Vue Router configuration
  │   └── index.js
  ├── App.vue          # Root component
  ├── main.js          # Application entry point
  └── style.css        # Global styles
```

## Brand Colors

- Primary: `#4F357F`
- Background: `#FAFAFA`
- Text Primary: `#333333`
- Text Secondary: `#666666`

## Navigation

The site includes:
- A responsive navigation bar with hamburger menu on mobile
- Smooth scrolling to sections on the index page
- Separate pages for FAQs and History

## Address Eligibility Lookup

The site includes an anonymous address eligibility lookup feature:
- Users can enter any address to check eligibility
- Address autocomplete uses Google Places API (if configured) to provide real address suggestions for any input
- This ensures anonymity - users cannot determine eligible addresses by testing different inputs
- Unit numbers (APT, #, UNIT, STE, etc.) are automatically stripped from addresses for privacy
- Eligible addresses are stored without unit information in the source code
