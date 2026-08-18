# Dealer Website Templates — motors.bivetica.com

Three ready-to-use dealer website templates with customizable elements. Dealers select a template, then customize colors, branding, text, and vehicle data.

---

## Template 1: Modern Minimalist

**Best for:** Volume dealers, large inventory, contemporary brand

**Characteristics:**
- Clean, contemporary design
- Emphasis on vehicle grid layout
- Fast-loading, minimal graphics
- Easy navigation and search
- Professional corporate feel

**Customizable Elements:**
- Brand color (accent color used throughout)
- Dealership name & tagline
- Logo/logo placement
- Navigation menu items
- Featured vehicles (up to 6)
- Contact info and hours
- Social media links
- Custom sections/pages

**Data Required:**
- Dealership name, phone, email
- Physical address, hours
- Logo file (PNG/SVG)
- Featured vehicles (6): images, year, make, model, price, specs
- Full inventory: make, model, year, price, color, mileage, specs

**Ideal For:** Classic & Historic Motors (current example in mockup)

---

## Template 2: Classic Showroom

**Best for:** High-end dealers, curated collections, prestige brands

**Characteristics:**
- Traditional luxury dealership aesthetic
- Serif typography
- Gold/brass accents
- Feature-focused layout
- Elevated, distinguished tone
- Smaller, curated inventory

**Customizable Elements:**
- Accent color (default: gold #d4af37)
- Dealership name & tagline
- Featured showcase vehicle (with large description)
- Gallery of additional vehicles (8-12)
- About/history section
- Testimonials section (optional)
- Contact methods and hours

**Data Required:**
- Dealership name, address, phone, email
- Brand story/about text
- Logo file
- Featured showcase vehicle: large image, detailed description, full specs
- Gallery vehicles (8-12): images, year, make, model, price
- Services offered
- Optional: testimonials from customers

**Ideal For:** Heritage dealers, limited collections, concierge-style services

---

## Template 3: Lifestyle/Premium

**Best for:** Modern luxury dealers, performance cars, high-value inventory

**Characteristics:**
- Modern, contemporary design
- Dark/bold color palette
- Hero imagery
- Featured vehicle cards with badges
- Emphasis on performance specs
- Professional luxury tone

**Customizable Elements:**
- Primary brand color (accent color)
- Dealership name
- Logo
- Featured vehicles (3): images, specs, badges (NEW, FEATURED, SOLD)
- Full inventory grid
- Call-to-action buttons
- Contact methods
- Social media integration

**Data Required:**
- Dealership name, phone, email, address
- Logo file
- Primary brand color (hex)
- Featured vehicles (3): high-res images, year, make, model, price, full specs, description
- Full inventory (grid view): images, make, model, year, price, specs
- Booking/contact form endpoint

**Ideal For:** Performance dealers, Lamborghini/Ferrari/McLaren specialists, younger audiences

---

## Customization System Architecture

### Level 1: Template Selection
Dealer chooses one of 3 templates → system loads base template

### Level 2: Basic Customization
Dealer edits:
- Dealership name, tagline, contact info
- Logo upload
- Primary colors (1-3 main colors)
- Featured vehicles (images + data)
- Navigation menu labels

### Level 3: Advanced Customization (Future)
- Custom CSS overrides
- Additional sections (services, testimonials, about)
- Custom domain setup
- Payment/booking integration
- Analytics dashboard

---

## Data Structure for Dealer Input

### Dealership Profile
```json
{
  "name": "Classic & Historic Motors",
  "tagline": "Premium collector vehicles",
  "phone": "+44 (0)1234 567890",
  "email": "info@classichistoric.co.uk",
  "address": "123 Heritage Lane, Surrey, UK",
  "hours": {
    "monday_friday": "9am - 6pm",
    "saturday": "10am - 4pm",
    "sunday": "By appointment"
  },
  "logo_url": "/logos/dealer_123.png",
  "primary_color": "#0066cc",
  "secondary_color": "#f0f0f0",
  "accent_color": "#d4af37"
}
```

### Vehicle Listing
```json
{
  "id": "vehicle_001",
  "year": 1987,
  "make": "Ferrari",
  "model": "Testarossa",
  "price": 245000,
  "currency": "GBP",
  "color": "Red",
  "mileage": 45234,
  "mileage_unit": "miles",
  "engine": "V12",
  "horsepower": 390,
  "transmission": "Manual",
  "description": "Exceptional Testarossa in original condition...",
  "images": ["/vehicles/ferrari_testarossa_1.jpg", ...],
  "featured": true,
  "badge": "FEATURED|NEW|SOLD|none"
}
```

---

## Template Customization Checklist

### Before Going Live
- [ ] Dealership name and tagline finalized
- [ ] Logo uploaded and positioned correctly
- [ ] Color scheme selected and tested
- [ ] Contact information verified
- [ ] Hours of operation entered
- [ ] Featured vehicles selected and images optimized
- [ ] All vehicle data entered (make, model, year, price, specs)
- [ ] Contact form connected (email, booking system, etc.)
- [ ] Mobile responsive tested
- [ ] Social media links added
- [ ] Privacy policy updated
- [ ] Domain/subdomain configured

---

## Technical Implementation

### File Structure
```
/motors.bivetica.com/
  /templates/
    /1-modern/
      index.html
      styles.css
      assets/
    /2-showroom/
      index.html
      styles.css
      assets/
    /3-premium/
      index.html
      styles.css
      assets/
  /dealer-customizer/
    config.json (dealer settings)
    vehicles.json (inventory)
    build.php (render template + data)
```

### Dealer Control Panel Features
1. **Template Selection** — View 3 options, select preferred
2. **Profile Setup** — Enter dealership info
3. **Branding** — Upload logo, select colors
4. **Inventory Management** — Add/edit vehicles
5. **Preview** — Live preview of changes
6. **Publish** — Make live at dealer subdomain

---

## Customization Examples

### Example 1: Classic & Historic Motors (Template 1 - Modern)
- Color: Blue (#0066cc)
- Featured: 6 classic/historic vehicles
- Emphasis: Rarity, documentation, heritage
- Call-to-action: "View Details", "Contact for Viewing"

### Example 2: Elite Motors (Template 2 - Showroom)
- Accent: Gold (#d4af37)
- Featured: 1 showcase vehicle with full write-up
- Emphasis: Story, provenance, craftsmanship
- Call-to-action: "Request Viewing", "Concierge Service"

### Example 3: Velocity Motors (Template 3 - Premium)
- Color: Red (#c41e3a)
- Featured: 3 high-performance vehicles
- Emphasis: Specs, performance, lifestyle
- Call-to-action: "Book Viewing", "Explore Collection"

---

## Future Enhancements

1. **Template 4: Auction/Broker** — For dealers listing multiple inventory quickly
2. **Template 5: Family Business** — Warm, personal, heritage focus
3. **Dynamic Colors** — AI-generated color schemes based on brand
4. **Component Blocks** — Drag-and-drop page builder
5. **Live Sync** — Inventory syncs from dealer's own system via API
6. **Booking Integration** — Stripe for deposits, Calendly for viewings
7. **Analytics** — Track views, inquiries, conversions per vehicle

---

## Deployment Steps

### Phase 1: Setup (Week 1-2)
1. Copy selected template HTML/CSS to dealer subdomain
2. Create dealer config.json with branding
3. Set up vehicles.json with inventory
4. Test responsive design on mobile/tablet

### Phase 2: Customization (Week 2-3)
1. Dealer uploads logo
2. Dealer enters contact information
3. Dealer selects colors
4. Dealer adds featured vehicles and full inventory

### Phase 3: Launch (Week 3-4)
1. Final QA testing
2. SSL certificate setup
3. Domain DNS configuration
4. Go live at [dealername].motors.bivetica.com
5. Announce to dealer network

---

## Support & Training

**Dealer Onboarding:**
- Video walkthrough for template selection (5 min)
- Customizer tutorial (10 min)
- Best practices guide (image sizing, SEO, etc.)
- Email support: support@motors.bivetica.com
- Live chat during business hours

**Image Requirements:**
- Vehicle images: min 1200×800px, JPG/PNG
- Logo: vector preferred (SVG), 300×150px min
- Featured showcase: 1400×900px for best quality
- Max file size: 5MB per image

---

## Success Metrics

Track per-template:
- Page load time (target: <2 sec)
- Mobile traffic percentage
- Conversion rate (inquiry → contact)
- Average time on site
- Bounce rate
- Scroll depth (which content engages?)
