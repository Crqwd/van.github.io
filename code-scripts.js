// Code Showcase Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle parallax effect to shapes
    const shapes = document.querySelectorAll('.shape, .glow, .collaboration-shape, .collaboration-glow');
    
    if (shapes.length) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            shapes.forEach(shape => {
                const speedX = parseFloat(shape.getAttribute('data-speed-x') || 20);
                const speedY = parseFloat(shape.getAttribute('data-speed-y') || 20);
                
                const moveX = (x - 0.5) * speedX;
                const moveY = (y - 0.5) * speedY;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    const projectData = {
        "Fetch Weather API": {
            tags: ["JavaScript", "HTML5", "REST API"],
            description: "A weather application that fetches current conditions and forecasts from a public API, with responsive design and user-friendly interface for location searches.",
            code: `// Weather API Integration
const API_KEY = 'your_api_key'; // Replace with your actual API key from WeatherAPI.com
const BASE_URL = 'https://api.weatherapi.com/v1';

// DOM Elements
const weatherApp = document.createElement('div');
weatherApp.classList.add('weather-app');

// Create the layout
weatherApp.innerHTML = \`
  <div class="weather-header">
    <h2>Weather Forecast</h2>
    <p>Enter a city name to get current weather and forecast</p>
  </div>
  
  <div class="search-container">
    <input type="text" id="city-input" placeholder="Enter city name...">
    <button id="search-button"><i class="fas fa-search"></i></button>
  </div>
  
  <div id="error-message"></div>
  
  <div class="weather-content">
    <div id="current-weather" class="weather-panel"></div>
    <div id="forecast" class="forecast-panel"></div>
  </div>
\`;

// Append to container
document.getElementById('weather-container').appendChild(weatherApp);

// Get DOM elements after they've been created
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const errorMessage = document.getElementById('error-message');

// Event Listeners
searchButton.addEventListener('click', getWeatherData);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeatherData();
  }
});

// Fetch Weather Data
async function getWeatherData() {
  const city = cityInput.value.trim();
  
  if (!city) {
    showError('Please enter a city name');
    return;
  }
  
  try {
    // Show loading state
    currentWeather.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading weather data...</p></div>';
    forecast.innerHTML = '';
    errorMessage.innerHTML = '';
    
    // Fetch current weather data
    const weatherResponse = await fetch(
      \`\${BASE_URL}/current.json?key=\${API_KEY}&q=\${city}&aqi=yes\`
    );
    
    // Fetch 3-day forecast data
    const forecastResponse = await fetch(
      \`\${BASE_URL}/forecast.json?key=\${API_KEY}&q=\${city}&days=3&aqi=yes&alerts=no\`
    );
    
    if (!weatherResponse.ok || !forecastResponse.ok) {
      throw new Error('City not found or API error');
    }
    
    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();
    
    // Display the data
    displayCurrentWeather(weatherData);
    displayForecast(forecastData);
    
  } catch (error) {
    showError(error.message);
  }
}

// Display Current Weather
function displayCurrentWeather(data) {
  const { location, current } = data;
  
  const weatherHTML = \`
    <div class="weather-card">
      <div class="location">
        <h2>\${location.name}, \${location.country}</h2>
        <p>Local time: \${location.localtime}</p>
      </div>
      <div class="current-conditions">
        <img src="https:\${current.condition.icon}" alt="\${current.condition.text}">
        <div class="temperature">\${current.temp_c}°C / \${current.temp_f}°F</div>
        <div class="condition">\${current.condition.text}</div>
      </div>
      <div class="details">
        <div class="detail"><i class="fas fa-wind"></i> Wind: \${current.wind_kph} km/h</div>
        <div class="detail"><i class="fas fa-tint"></i> Humidity: \${current.humidity}%</div>
        <div class="detail"><i class="fas fa-thermometer-half"></i> Feels like: \${current.feelslike_c}°C</div>
        <div class="detail"><i class="fas fa-compress-arrows-alt"></i> Pressure: \${current.pressure_mb} mb</div>
        <div class="detail"><i class="fas fa-eye"></i> Visibility: \${current.vis_km} km</div>
        <div class="detail"><i class="fas fa-sun"></i> UV Index: \${current.uv}</div>
      </div>
    </div>
  \`;
  
  currentWeather.innerHTML = weatherHTML;
}

// Display Forecast
function displayForecast(data) {
  const { forecast } = data;
  
  let forecastHTML = '<h3>3-Day Forecast</h3><div class="forecast-container">';
  
  forecast.forecastday.forEach(day => {
    const date = new Date(day.date);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    
    forecastHTML += \`
      <div class="forecast-day">
        <div class="forecast-date">\${date.toLocaleDateString('en-US', options)}</div>
        <img src="https:\${day.day.condition.icon}" alt="\${day.day.condition.text}">
        <div class="forecast-temp">
          <span class="high">\${day.day.maxtemp_c}°</span>
          <span class="low">\${day.day.mintemp_c}°</span>
        </div>
        <div class="forecast-condition">\${day.day.condition.text}</div>
        <div class="forecast-details">
          <div><i class="fas fa-tint"></i> \${day.day.daily_chance_of_rain}%</div>
          <div><i class="fas fa-wind"></i> \${day.day.maxwind_kph} km/h</div>
        </div>
      </div>
    \`;
  });
  
  forecastHTML += '</div>';
  forecast.innerHTML = forecastHTML;
}

// Show Error Message
function showError(message) {
  errorMessage.innerHTML = \`<div class="error"><i class="fas fa-exclamation-circle"></i> \${message}</div>\`;
  currentWeather.innerHTML = '';
  forecast.innerHTML = '';
}

// CSS for the Weather App
const weatherStyles = \`
/* Weather App Styles */
.weather-app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f5f7fa;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.weather-header {
  text-align: center;
  margin-bottom: 20px;
}

.weather-header h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 5px;
}

.weather-header p {
  color: #7f8c8d;
  font-size: 14px;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

#city-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px 0 0 30px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

#city-input:focus {
  border-color: #3498db;
}

#search-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

#search-button:hover {
  background-color: #2980b9;
}

.weather-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .weather-content {
    grid-template-columns: 1fr 1fr;
  }
}

.weather-card, .weather-panel, .forecast-panel {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.location {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.location h2 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 5px;
}

.location p {
  color: #7f8c8d;
  font-size: 14px;
}

.current-conditions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.current-conditions img {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.temperature {
  font-size: 36px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.condition {
  font-size: 18px;
  color: #7f8c8d;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2c3e50;
}

.detail i {
  color: #3498db;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.forecast-panel h3 {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.forecast-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.forecast-day {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s;
}

.forecast-day:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.forecast-date {
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.forecast-day img {
  width: 50px;
  height: 50px;
  margin: 0 auto 10px;
}

.forecast-temp {
  margin-bottom: 5px;
}

.forecast-temp .high {
  font-weight: 700;
  color: #e74c3c;
  margin-right: 10px;
}

.forecast-temp .low {
  font-weight: 700;
  color: #3498db;
}

.forecast-condition {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.forecast-details {
  display: flex;
  justify-content: space-around;
  font-size: 12px;
  color: #7f8c8d;
}

.error {
  background-color: #ffeceb;
  color: #e74c3c;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: #7f8c8d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .weather-app {
    background-color: #1a1a2e;
    color: #f0f0f0;
  }
  
  .weather-header h2,
  .location h2,
  .temperature,
  .forecast-panel h3,
  .forecast-date,
  .detail {
    color: #f0f0f0;
  }
  
  .weather-header p,
  .location p,
  .condition,
  .forecast-condition {
    color: #a0a0a0;
  }
  
  .weather-card,
  .weather-panel,
  .forecast-panel {
    background-color: #16213e;
  }
  
  .forecast-day {
    background-color: #0f3460;
  }
  
  #city-input {
    background-color: #16213e;
    color: #f0f0f0;
    border-color: #3498db;
  }
  
  .location {
    border-bottom-color: #333;
  }
}
\`;

// Add styles to page
function addWeatherStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = weatherStyles;
  document.head.appendChild(styleElement);
}

// Usage example:
// 1. Add a container to your HTML
// <div id="weather-container"></div>
// 
// 2. Call these functions to initialize
// addWeatherStyles();
// document.addEventListener('DOMContentLoaded', function() {
//   // Initialize the weather app once the DOM is fully loaded
//   initWeatherApp();
// });
//
// function initWeatherApp() {
//   // Create and inject the weather app into the container
//   const weatherContainer = document.getElementById('weather-container');
//   if (weatherContainer) {
//     // Add the app to the container
//     weatherContainer.appendChild(weatherApp);
//     // Optionally load a default city
//     // getWeatherData('London');
//   }
// }`
        },
        "Light Dark Mode Switch": {
            tags: ["JavaScript", "CSS3", "UX Design"],
            description: "A theme toggle component that allows users to switch between light and dark modes with smooth transitions and persistent preferences.",
            code: `// Theme Toggle Implementation
class ThemeToggle {
  constructor() {
    // DOM elements
    this.toggleButton = document.getElementById('theme-toggle');
    this.toggleIcon = document.getElementById('theme-icon');
    this.styleSheet = document.getElementById('theme-stylesheet');
    
    // Default theme (system preference or previously saved)
    this.currentTheme = localStorage.getItem('theme') || 'auto';
    
    // Initialize
    this.init();
  }
  
  init() {
    // Apply saved theme or detect system preference
    this.applyTheme();
    
    // Add event listener to toggle button
    this.toggleButton.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentTheme === 'auto') {
        this.applyTheme();
      }
    });
    
    // Make toggle visible after initialization
    this.toggleButton.classList.remove('hidden');
    this.toggleButton.classList.add('fade-in');
  }
  
  toggleTheme() {
    // Rotate between themes: light -> dark -> auto -> light
    switch (this.currentTheme) {
      case 'light':
        this.currentTheme = 'dark';
        break;
      case 'dark':
        this.currentTheme = 'auto';
        break;
      case 'auto':
      default:
        this.currentTheme = 'light';
        break;
    }
    
    // Save preference
    localStorage.setItem('theme', this.currentTheme);
    
    // Apply new theme
    this.applyTheme();
    
    // Announce theme change for screen readers
    this.announceThemeChange();
  }
  
  applyTheme() {
    // Remove previous theme classes
    document.body.classList.remove('light-theme', 'dark-theme');
    
    // Determine which theme to apply
    let effectiveTheme;
    
    if (this.currentTheme === 'auto') {
      // Check system preference
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      this.toggleIcon.className = 'fas fa-adjust';
    } else {
      effectiveTheme = this.currentTheme;
      this.toggleIcon.className = effectiveTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Apply theme class to body
    document.body.classList.add(`${effectiveTheme}-theme`);
    
    // Update toggle button aria-label
    let ariaLabel;
    switch (this.currentTheme) {
      case 'light':
        ariaLabel = 'Switch to dark theme';
        break;
      case 'dark':
        ariaLabel = 'Switch to auto theme (system preference)';
        break;
      case 'auto':
        ariaLabel = 'Switch to light theme';
        break;
    }
    this.toggleButton.setAttribute('aria-label', ariaLabel);
    
    // Add nice transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
  
  announceThemeChange() {
    // Create and update accessible announcement
    const announcement = document.getElementById('theme-announcement') || document.createElement('div');
    announcement.id = 'theme-announcement';
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'polite');
    
    let message;
    switch (this.currentTheme) {
      case 'light':
        message = 'Light theme activated';
        break;
      case 'dark':
        message = 'Dark theme activated';
        break;
      case 'auto':
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        message = `Auto theme activated, using system preference: ${systemTheme}`;
        break;
    }
    
    announcement.textContent = message;
    
    if (!document.getElementById('theme-announcement')) {
      document.body.appendChild(announcement);
    }
  }
}

// Initialize theme toggle on document ready
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});

/* CSS Variables for theming:
:root {
  --light-bg: #ffffff;
  --light-text: #333333;
  --light-accent: #3498db;
  --light-surface: #f5f5f5;
  --light-border: #e0e0e0;
  
  --dark-bg: #121212;
  --dark-text: #e0e0e0;
  --dark-accent: #55b9f3;
  --dark-surface: #1e1e1e;
  --dark-border: #333333;
  
  --transition-speed: 0.3s;
}

body {
  transition: background-color var(--transition-speed) ease,
              color var(--transition-speed) ease;
}

.light-theme {
  --bg: var(--light-bg);
  --text: var(--light-text);
  --accent: var(--light-accent);
  --surface: var(--light-surface);
  --border: var(--light-border);
  
  background-color: var(--bg);
  color: var(--text);
}

.dark-theme {
  --bg: var(--dark-bg);
  --text: var(--dark-text);
  --accent: var(--dark-accent);
  --surface: var(--dark-surface);
  --border: var(--dark-border);
  
  background-color: var(--bg);
  color: var(--text);
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--accent);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.theme-toggle:active {
  transform: translateY(1px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
*/`
        },
        "Java User Registration": {
            tags: ["Java", "Spring Boot", "JPA"],
            description: "A secure user registration system built with Java, Spring Boot, and JPA that handles account creation, data validation, and secure password storage.",
            code: `import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserRegistrationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDTO userDTO,
                                         BindingResult result) {
        // Check for validation errors
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        // Check if username already exists
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity
                .badRequest()
                .body("Username is already taken!");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity
                .badRequest()
                .body("Email is already in use!");
        }

        // Create new user
        User user = new User(
            userDTO.getUsername(),
            userDTO.getEmail(),
            passwordEncoder.encode(userDTO.getPassword())
        );

        // Save user to database
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}`
        },
        "Python User Authentication": {
            tags: ["Python", "Flask", "JWT"],
            description: "A Python-based user authentication system with Flask and JWT that manages login sessions, password security, and role-based access control.",
            code: `from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    create_refresh_token, get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
from functools import wraps
import re

app = Flask(__name__)

# Config
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Initialize JWT
jwt = JWTManager(app)

# Mock database
users_db = {}
roles_db = {'admin': ['read', 'write', 'delete'], 'user': ['read']}

# Role decorator
def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            current_user = get_jwt_identity()
            user_role = users_db.get(current_user, {}).get('role', 'user')
            
            if user_role != role and user_role != 'admin':
                return jsonify(message='Permission denied'), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def validate_password(password):
    """Validate password strength"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r'[0-9]', password):
        return False, "Password must contain at least one number"
    return True, ""

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username', '')
    password = data.get('password', '')
    email = data.get('email', '')
    
    # Validation
    if not username or not password or not email:
        return jsonify(error='All fields are required'), 400
    
    if username in users_db:
        return jsonify(error='Username already exists'), 400
    
    # Validate password
    is_valid, error_msg = validate_password(password)
    if not is_valid:
        return jsonify(error=error_msg), 400
    
    # Hash password and store user
    hashed_password = generate_password_hash(password)
    users_db[username] = {
        'username': username,
        'password': hashed_password,
        'email': email,
        'role': 'user'
    }
    
    return jsonify(message='User registered successfully'), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', '')
    password = data.get('password', '')
    
    user = users_db.get(username)
    if not user or not check_password_hash(user['password'], password):
        return jsonify(error='Invalid credentials'), 401
    
    # Create tokens
    access_token = create_access_token(identity=username)
    refresh_token = create_refresh_token(identity=username)
    
    return jsonify(
        message='Login successful',
        access_token=access_token,
        refresh_token=refresh_token
    ), 200

@app.route('/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token), 200

# Protected route example
@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user_data = users_db.get(current_user)
    
    if not user_data:
        return jsonify(error='User not found'), 404
    
    # Remove sensitive data
    profile = {
        'username': user_data['username'],
        'email': user_data['email'],
        'role': user_data['role']
    }
    
    return jsonify(profile=profile), 200

# Admin only route example
@app.route('/api/users', methods=['GET'])
@role_required('admin')
def get_all_users():
    user_list = [{
        'username': user_data['username'],
        'email': user_data['email'],
        'role': user_data['role']
    } for user_data in users_db.values()]
    
    return jsonify(users=user_list), 200

if __name__ == '__main__':
    app.run(debug=True)`
        },

        }
    };
    
    // Header scroll effect
    const header = document.querySelector('header');

    function checkScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Check scroll position on load
    if (header) {
        checkScroll();
        // Listen for scroll events
        window.addEventListener('scroll', checkScroll);
    }

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('nav a');

    if (navItems.length && navLinks) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Code Modal setup
    const codeModal = document.getElementById('code-modal');
    const codeModalTitle = document.getElementById('code-modal-title');
    const codeModalTags = document.getElementById('code-modal-tags');
    const codeModalSnippet = document.getElementById('code-modal-snippet');
    const codeModalDescription = document.getElementById('code-modal-description');
    const codeModalClose = codeModal?.querySelector('.modal-close');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    
    // Global function to close code modal
    function closeCodeModal() {
        if (codeModal && codeModal.style.display === 'block') {
            codeModal.classList.remove('active');
            setTimeout(() => {
                codeModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 300);
        }
    }
    
    // Handle toggling between Frontend and Backend projects
    const categoryButtons = document.querySelectorAll('.category-icon');
    const projectSections = document.querySelectorAll('.project-section');
    
    // Simple tab switching function
    function handleTabClick(e) {
        e.preventDefault();
        
        // Remove active class from all buttons and sections
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        projectSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
        
        // Add active class to clicked button
        e.currentTarget.classList.add('active');
        
        // Show corresponding section
        const targetId = e.currentTarget.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            console.log("Showing section:", targetId);
            targetSection.style.display = 'block';
            
            // Force browser reflow
            void targetSection.offsetWidth;
            
            // Animate in
            targetSection.classList.add('active');
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }
    }
    
    // Set up tab click handlers
    if (categoryButtons.length > 0) {
        // Make sure sections have proper transition styling
        projectSections.forEach(section => {
            section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        // Add click handlers to each button
        categoryButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });
        
        // Initialize with first tab active
        const initialActive = document.querySelector('.category-icon.active');
        const initialTarget = initialActive?.getAttribute('data-target');
        
        if (initialTarget) {
            const targetSection = document.getElementById(initialTarget);
            if (targetSection) {
                projectSections.forEach(section => {
                    if (section.id !== initialTarget) {
                        section.classList.remove('active');
                        section.style.display = 'none';
                        section.style.opacity = '0';
                    }
                });
                
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }
        }
    }
    
    // Set up click handlers for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length && codeModal) {
        projectCards.forEach(card => {
            card.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                console.log("Project card clicked");
                
                // Get project title from the card
                const projectTitle = this.querySelector('h3').textContent;
                console.log("Project title:", projectTitle);
                
                // Check if we have code data for this project
                if (projectData[projectTitle]) {
                    // Set modal content
                    codeModalTitle.textContent = projectTitle;
                    codeModalDescription.textContent = projectData[projectTitle].description;
                    
                    // Clear existing tags and add new ones
                    codeModalTags.innerHTML = '';
                    projectData[projectTitle].tags.forEach(tag => {
                        const tagSpan = document.createElement('span');
                        tagSpan.textContent = tag;
                        codeModalTags.appendChild(tagSpan);
                    });
                    
                    // Set code snippet
                    codeModalSnippet.innerHTML = `<code>${escapeHtml(projectData[projectTitle].code)}</code>`;
                    
                    // Show the modal
                    codeModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                    
                    // Force browser reflow to ensure transitions work
                    void codeModal.offsetWidth;
                    
                    // Add active class
                    codeModal.classList.add('active');
                }
            });
        });
    }
    
    // Modal close button
    if (codeModalClose) {
        codeModalClose.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Close button clicked");
            closeCodeModal();
        });
    }
    
    // Close modal when clicking outside
    if (codeModal) {
        codeModal.addEventListener('click', function(event) {
            if (event.target === this) {
                console.log("Clicked outside modal content");
                closeCodeModal();
            }
        });
    }
    
    // Key press handling for ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            console.log("ESC key pressed");
            closeCodeModal();
        }
    });
    
    // Handle the copy code button
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            console.log("Copy button clicked");
            
            // Get the code text without HTML tags
            const codeText = codeModalSnippet.textContent;
            
            // Try the modern Clipboard API first
            try {
                navigator.clipboard.writeText(codeText).then(() => {
                    showCopySuccess();
                }).catch(err => {
                    console.warn('Clipboard API failed:', err);
                    fallbackCopy(codeText);
                });
            } catch (err) {
                console.warn('Clipboard API not available:', err);
                fallbackCopy(codeText);
            }
            
            // Fallback copy method using textarea
            function fallbackCopy(text) {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        showCopySuccess();
                    } else {
                        showCopyFailure();
                    }
                } catch (err) {
                    console.error('Fallback copy failed:', err);
                    showCopyFailure();
                }
                
                document.body.removeChild(textarea);
            }
            
            // Show success message
            function showCopySuccess() {
                copyCodeBtn.classList.add('success');
                copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyCodeBtn.classList.remove('success');
                    copyCodeBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
                }, 2000);
            }
            
            // Show failure message
            function showCopyFailure() {
                copyCodeBtn.innerHTML = '<i class="fas fa-times"></i> Failed to copy';
                
                setTimeout(() => {
                    copyCodeBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
                }, 2000);
            }
        });
    }
    
    // Helper function to escape HTML special characters
    function escapeHtml(html) {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`/g, "&#096;")
            .replace(/\n/g, "<br>");
    }
});