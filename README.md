# Orwell Bridge Status Monitor

A real-time monitoring dashboard for the Orwell Bridge (A14) providing live traffic status, weather conditions, and historical events. This project helps commuters and logistics companies stay informed about bridge conditions and potential delays.

## 🌉 About the Orwell Bridge

The Orwell Bridge is a major cable-stayed bridge on the A14 in Suffolk, England, carrying traffic over the River Orwell. Due to its height and exposure, the bridge is frequently subject to closures during high winds, making real-time status monitoring essential for local traffic management.

## ✨ Features

- **Real-Time Traffic Status**: Live bridge status using TomTom Traffic API
- **Weather Monitoring**: Current weather conditions from Open-Meteo API
- **Historical Events**: Track past closures and delays with MongoDB storage
- **Responsive Dashboard**: Clean, mobile-friendly interface
- **High-Traffic Optimization**: Advanced caching with stale-while-revalidate pattern
- **Status Indicators**: Visual traffic light system (Open/Delayed/Closed)
- **Direction-Specific Data**: Separate monitoring for eastbound and westbound lanes

## 🚀 Live Demo

Visit the live application: [Orwell Bridge Status](https://your-deployment-url.com)

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **APIs**: TomTom Traffic API, Open-Meteo Weather API
- **Database**: MongoDB Atlas
- **Caching**: Custom in-memory cache with request deduplication
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- TomTom API key
- Open-Meteo API access (free)

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required API Keys
TOMTOM_API_KEY=your_tomtom_api_key_here
WEATHER_API_KEY=your_openmeteo_key_here

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Optional: For development
NODE_ENV=development
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/developedbyalex/OrwellBridgeStatusV2.git
   cd OrwellBridgeStatusV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your API keys and MongoDB connection string

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bridge-status/    # Main bridge status endpoint
│   │   ├── events/           # Historical events API
│   │   └── weather/          # Weather data API
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # App layout
│   └── page.tsx             # Main dashboard
├── components/
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── cache.ts             # Caching system
│   ├── mongodb.ts           # Database connection
│   ├── traffic.ts           # Traffic data processing
│   ├── weather.ts           # Weather API integration
│   └── utils.ts             # Utility functions
└── types/
    └── bridge.ts            # TypeScript definitions
```

## 🔧 API Endpoints

### Bridge Status
- `GET /api/bridge-status` - Current bridge status and traffic data
- Returns real-time status for both directions with historical context

### Events
- `GET /api/events` - Recent bridge closure and delay events
- Filtered for significant events (closures/delays only)

### Weather
- `GET /api/weather` - Current weather conditions
- Includes temperature, wind speed, and conditions

## 🎯 Caching Strategy

The application implements intelligent caching to handle high traffic:

- **Bridge Status**: 10-minute TTL, 5-minute stale time
- **Weather Data**: 15-minute TTL
- **Events**: 10-minute TTL
- **Stale-While-Revalidate**: Serves stale data while refreshing in background
- **Request Deduplication**: Prevents API spam during traffic spikes

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Automatic deployments on git push

### Other Platforms

The application can be deployed on any Node.js hosting platform:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔍 Monitoring & Analytics

- Built-in error handling and fallback mechanisms
- Console logging for debugging and monitoring
- Graceful degradation when APIs are unavailable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TomTom for traffic data API
- Open-Meteo for weather data
- Highways England for bridge specifications
- The open-source community for excellent tools and libraries

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

**Note**: This is an unofficial monitoring tool. For official bridge status and travel information, please refer to Highways England and local traffic authorities.