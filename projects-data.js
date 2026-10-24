// Albert S. Villasor - Portfolio Project Data Store
// Comprehensive specifications, architecture details, and interactive configuration

const PROJECTS_DATA = [
  {
    id: "safedrive",
    title: "SafeDrive",
    tagline: "Real-Time Emergency SOS, Live Geolocation & Driver Safety App",
    category: "mobile",
    categoryLabel: "Flutter Mobile App",
    featured: true,
    thumbnail: "logo.png",
    heroImage: "background.jpg",
    accentColor: "#ef4444",
    role: "Lead Mobile Developer",
    status: "Completed (Academic Project)",
    summary: "A life-saving mobile emergency application designed to protect drivers and commuters. Features one-touch SOS distress broadcasting, live GPS coordinates tracking with interactive OpenStreetMap routing, automated emergency contact dispatch, and secure phone OTP authentication.",
    overview: "SafeDrive addresses driver vulnerability and roadside emergencies by creating an ultra-responsive safety net on mobile devices. Built using Flutter and Dart, the app features an instantaneous emergency dispatch system, real-time geolocation tracking via OpenStreetMap/flutter_map, automated push notifications, and a curated trusted contacts network.",
    metrics: [
      { label: "Platform", value: "Flutter / Dart (Cross-Platform)" },
      { label: "Emergency Trigger", value: "1-Tap SOS with Countdown" },
      { label: "Location Engine", value: "Geolocator + Flutter Map" },
      { label: "Auth Flow", value: "Phone OTP via PInput" }
    ],
    tags: ["Flutter", "Dart", "flutter_map", "latlong2", "geolocator", "pinput", "shared_preferences", "local_notifications", "Mobile UI/UX"],
    features: [
      {
        title: "Instant SOS Emergency Dispatch",
        desc: "A prominent SOS button with visual state feedback and quick cancellation to prevent false alarms, immediately alerting designated contacts."
      },
      {
        title: "Real-Time Geolocation & Navigation",
        desc: "Interactive map rendering using flutter_map and latlong2 combined with high-precision GPS positioning via geolocator."
      },
      {
        title: "Emergency Guardian Network",
        desc: "Manage trusted emergency contacts who receive automatic SOS alerts with exact coordinates and driver status."
      },
      {
        title: "Secure Phone OTP Authentication",
        desc: "Seamless user onboarding and secure authentication utilizing the pinput library for instant pin verification."
      },
      {
        title: "Local Push Notification Pipeline",
        desc: "Integrated flutter_local_notifications for critical alert confirmations and safety status updates."
      },
      {
        title: "Trip History & Destination Logs",
        desc: "Persistent local trip tracking and destination archiving stored via shared_preferences."
      }
    ],
    architecture: [
      "Presentation Layer: Flutter Material 3 widgets with custom animations and responsive screen layouts (home_page.dart, destination_page.dart, contacts_page.dart).",
      "Location & Mapping: geolocator service feeding coordinates to flutter_map TileLayer using OpenStreetMap tile provider.",
      "Notification Service: FlutterLocalNotificationsPlugin initialized at app startup for instant high-priority alerts.",
      "Data Persistence: SharedPreferences handling user session tokens, emergency contacts list, and trip logs."
    ],
    gallery: [
      { src: "logo.png", caption: "SafeDrive Brand Identity & Logo" },
      { src: "tutorial1.png", caption: "Onboarding: Emergency SOS Guide" },
      { src: "tutorial2.png", caption: "Onboarding: Real-Time GPS Tracking" },
      { src: "tutorial3.png", caption: "Onboarding: Emergency Contacts" },
      { src: "tutorial4.png", caption: "Onboarding: Instant Notifications" },
      { src: "car.png", caption: "Driver Interface Vehicle Asset" }
    ],
    codeSnippet: `// SOS Activation & Location Broadcast Handler in HomePage
void _triggerEmergencySOS() async {
  setState(() => _isSOSActive = true);
  
  // Obtain high-accuracy device coordinates
  Position position = await Geolocator.getCurrentPosition(
    desiredAccuracy: LocationAccuracy.high
  );
  
  // Dispatch local notification
  await flutterLocalNotificationsPlugin.show(
    0,
    "EMERGENCY ALERT BROADCASTED",
    "Current Lat: \${position.latitude}, Lng: \${position.longitude}",
    const NotificationDetails(
      android: AndroidNotificationDetails(
        'emergency_channel', 'Emergency Alerts',
        importance: Importance.max, priority: Priority.high
      )
    )
  );
  
  // Alert guardian contacts
  _notifyEmergencyContacts(position);
}`,
    demoType: "safedrive-simulator"
  },
  {
    id: "fashionpulse",
    title: "Fashion Pulse",
    tagline: "Full-Stack Editorial Publishing & Style Community Platform",
    category: "web",
    categoryLabel: "Django Web Platform",
    featured: true,
    thumbnail: "assets/images/projects/fashionpulse/editorial mission.jpg",
    heroImage: "assets/images/projects/fashionpulse/street heritage.jpg",
    accentColor: "#8b5cf6",
    role: "Full-Stack Web Developer",
    status: "Completed (Full-Stack Application)",
    summary: "A robust editorial publishing platform and interactive fashion community built on Django. Features a complete publication moderation lifecycle, interactive style gallery with category filtering, likes, comments, and automated real-time notification engine.",
    overview: "Fashion Pulse combines the depth of a digital fashion publication with community engagement features. Content contributors submit articles for review, editors manage approval workflows, and community members share high-res street style photography in an interactive gallery with engagement metrics.",
    metrics: [
      { label: "Backend Framework", value: "Python / Django 5" },
      { label: "Architecture", value: "MVC / Django MVT" },
      { label: "Community Module", value: "Interactive Style Gallery" },
      { label: "User Notifications", value: "Real-Time Activity Engine" }
    ],
    tags: ["Python", "Django", "Django ORM", "HTML5", "CSS3 / BEM", "JavaScript", "SQLite / PostgreSQL", "SEO & Meta", "Authentication"],
    features: [
      {
        title: "Multi-Tier Editorial Workflow",
        desc: "State machine managing Draft, Scheduled, and Published articles alongside Moderation states (Pending, Approved, Rejected)."
      },
      {
        title: "Interactive Style Gallery",
        desc: "Community visual feed with category tagging (Street, Modern, Minimal, Vintage), user image uploads, likes, and comment threads."
      },
      {
        title: "Automated User Activity Notifications",
        desc: "Dynamic notification system alerting creators when their photo is hearted, commented on, or when their submitted article is approved."
      },
      {
        title: "SEO Optimization & Reading Metrics",
        desc: "Automatic word-count reading time calculation, unique slug generation, meta descriptions, canonical URLs, and OpenGraph social tags."
      },
      {
        title: "Customizable User Profiles & Color Themes",
        desc: "User profiles with uploaded avatars, bio descriptions, location, and customizable profile theme colors."
      },
      {
        title: "Security & Account Management",
        desc: "Full authentication suite including signup, login, email verification, and secure password reset codes."
      }
    ],
    architecture: [
      "Backend Core: Django web framework with modular apps (articles, core, gallery) enforcing strict Separation of Concerns.",
      "Database & Models: Relational schema in Django ORM with foreign key relations for articles, comments, likes, and notifications.",
      "Editorial Lifecycle: Custom save() overrides calculating reading time dynamically and triggering automated notification hooks on status changes.",
      "Frontend & Styling: Component-driven CSS architecture (site.cards.css, site.gallery.css, site.dark-mode.css) with vanilla JS micro-interactions."
    ],
    gallery: [
      { src: "assets/images/projects/fashionpulse/editorial mission.jpg", caption: "Editorial Mission & Feature Layout" },
      { src: "assets/images/projects/fashionpulse/street heritage.jpg", caption: "Street Heritage Category Cover" },
      { src: "assets/images/projects/fashionpulse/minimalism.jpg", caption: "Minimalist Style Feature" },
      { src: "assets/images/projects/fashionpulse/sustainability.jpg", caption: "Sustainability in Contemporary Fashion" },
      { src: "assets/images/projects/fashionpulse/vision.jpg", caption: "Brand Vision & Aesthetic Moodboard" }
    ],
    codeSnippet: `// Django Model Hook for Reading Time & Slug Generation
class Article(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    content = models.TextField()
    read_time_minutes = models.PositiveSmallIntegerField(default=1)
    moderation_status = models.CharField(
        max_length=20,
        choices=ModerationStatus.choices,
        default=ModerationStatus.APPROVED
    )

    def save(self, *args, **kwargs):
        # Automatically compute read time based on word count
        words = len((self.content or '').split())
        self.read_time_minutes = max(1, (words + 199) // 200)
        super().save(*args, **kwargs)`,
    demoType: "fashionpulse-preview"
  },
  {
    id: "musicplayer",
    title: "Melody Stream (ADET Music Player)",
    tagline: "Modern Flutter Audio Streaming & Music Player Application",
    category: "mobile",
    categoryLabel: "Flutter Mobile App",
    featured: true,
    thumbnail: "assets/images/projects/musicplayer/glimpseofus.jpg",
    heroImage: "assets/images/projects/musicplayer/diewithasmile.jpg",
    accentColor: "#a855f7",
    role: "Mobile Developer",
    status: "Completed (Academic Project)",
    summary: "A sleek cross-platform music player application built in Flutter. Featuring custom audio playback engine integration via audioplayers, real-time seeking slider with dynamic duration listeners, Google Fonts typography, and dynamic album artwork displays.",
    overview: "Melody Stream demonstrates modern Flutter state management and audio stream manipulation. Designed with a dark aesthetic, the app provides responsive playback controls, audio duration scrubbing, and clean track metadata architecture.",
    metrics: [
      { label: "Framework", value: "Flutter SDK 3.5+" },
      { label: "Audio Engine", value: "Audioplayers Package" },
      { label: "Typography", value: "Google Fonts (Poppins)" },
      { label: "UI Theme", value: "Deep OLED Dark Mode" }
    ],
    tags: ["Flutter", "Dart", "audioplayers", "google_fonts", "State Management", "Audio Streaming", "Mobile UI"],
    features: [
      {
        title: "Dynamic Audio Engine",
        desc: "Integration with audioplayers for robust audio playback, pause, seek, and stream completion events."
      },
      {
        title: "Interactive Progress Seeking",
        desc: "Real-time slider synchronized with audio position and duration streams, enabling smooth scrubbing."
      },
      {
        title: "Rich Track Metadata & Art",
        desc: "Structured Song data model binding high-resolution album artwork, track title, and artist information."
      },
      {
        title: "OLED Dark Mode Experience",
        desc: "Deep contrast black aesthetic optimized for mobile displays with vibrant purple accent highlights."
      },
      {
        title: "Responsive Control Panel",
        desc: "Play, pause, skip forward, and rewind buttons with responsive tactile button states."
      }
    ],
    architecture: [
      "Stateful Audio Architecture: _MusicPlayerScreenState managing AudioPlayer instance listeners for duration and position streams.",
      "Event Bus: Audio state changes broadcasted via onDurationChanged, onPositionChanged, and onPlayerComplete listeners.",
      "Component Modularization: Clean Song model separating data definitions from UI rendering widgets."
    ],
    gallery: [
      { src: "assets/images/projects/musicplayer/glimpseofus.jpg", caption: "Glimpse of Us - Joji (Track Cover)" },
      { src: "assets/images/projects/musicplayer/diewithasmile.jpg", caption: "Die With A Smile - Lady Gaga & Bruno Mars" },
      { src: "assets/images/projects/musicplayer/versaceonthefloor.jpg", caption: "Versace on the Floor - Bruno Mars" },
      { src: "assets/images/projects/musicplayer/oceansandengines.jpg", caption: "Oceans & Engines - NIKI" },
      { src: "assets/images/projects/musicplayer/allornothing.jpg", caption: "All or Nothing Album Art" }
    ],
    codeSnippet: `// Flutter Audio Player State & Progress Listener Implementation
class _MusicPlayerScreenState extends State<MusicPlayerScreen> {
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool isPlaying = false;
  Duration _position = Duration.zero;
  Duration _duration = Duration.zero;

  @override
  void initState() {
    super.initState();
    _audioPlayer.onDurationChanged.listen((d) => setState(() => _duration = d));
    _audioPlayer.onPositionChanged.listen((p) => setState(() => _position = p));
    _audioPlayer.onPlayerComplete.listen((_) => setState(() => isPlaying = false));
  }

  void _togglePlay() {
    setState(() {
      if (isPlaying) {
        _audioPlayer.pause();
      } else {
        _audioPlayer.play(AssetSource(widget.song.audioPath));
      }
      isPlaying = !isPlaying;
    });
  }
}`,
    demoType: "music-player-demo"
  }
];
