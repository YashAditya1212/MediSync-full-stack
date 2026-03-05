# Admin Panel UI Files Guide 🎨

## 📁 Directory Structure

```
admin/src/
├── App.jsx                    # Main app layout & routing
├── index.css                  # Global styles
├── components/                # Reusable UI components
│   ├── Navbar.jsx            # Top navigation bar
│   └── Sidebar.jsx           # Left sidebar menu
└── pages/                     # Page components
    ├── Login.jsx             # Login page
    ├── Admin/                # Admin-specific pages
    │   ├── Dashboard.jsx     # Admin dashboard
    │   ├── AddDoctor.jsx     # Add new doctor form
    │   ├── DoctorsList.jsx   # List of all doctors
    │   └── AllAppointments.jsx # All appointments list
    └── Doctor/               # Doctor-specific pages
        ├── DoctorDashboard.jsx # Doctor dashboard
        ├── DoctorAppointments.jsx # Doctor's appointments
        └── DoctorProfile.jsx # Doctor profile page
```

---

## 🎯 Main UI Files to Modify

### 1. **Global Layout & Styling**

#### `admin/src/App.jsx`
- **Purpose:** Main app layout, routing, and overall structure
- **What to change:**
  - Overall page layout (background color, container structure)
  - Route configuration
  - Conditional rendering logic
- **Current:** Uses `bg-[#F8F9FD]` background, flex layout with Sidebar

#### `admin/src/index.css`
- **Purpose:** Global CSS styles, Tailwind directives
- **What to change:**
  - Global color scheme
  - Typography
  - Custom CSS classes
  - Tailwind configuration

---

### 2. **Navigation Components**

#### `admin/src/components/Navbar.jsx`
- **Purpose:** Top navigation bar
- **What to change:**
  - Logo/branding
  - Navigation items
  - User profile dropdown
  - Header styling and layout

#### `admin/src/components/Sidebar.jsx`
- **Purpose:** Left sidebar menu with navigation links
- **What to change:**
  - Menu items and icons
  - Sidebar width and styling
  - Active state indicators
  - Collapse/expand functionality

---

### 3. **Page Components**

#### `admin/src/pages/Login.jsx`
- **Purpose:** Login page for Admin/Doctor
- **What to change:**
  - Login form design
  - Input fields styling
  - Button styles
  - Page layout and background

#### `admin/src/pages/Admin/Dashboard.jsx`
- **Purpose:** Admin dashboard with statistics
- **What to change:**
  - Dashboard cards/widgets
  - Charts and graphs layout
  - Statistics display
  - Grid layout

#### `admin/src/pages/Admin/AddDoctor.jsx`
- **Purpose:** Form to add new doctor
- **What to change:**
  - Form layout and styling
  - Input field designs
  - File upload area
  - Submit button

#### `admin/src/pages/Admin/DoctorsList.jsx`
- **Purpose:** List/table of all doctors
- **What to change:**
  - Table/card layout
  - Doctor card design
  - Filter/search UI
  - Action buttons

#### `admin/src/pages/Admin/AllAppointments.jsx`
- **Purpose:** List of all appointments
- **What to change:**
  - Appointment card/table design
  - Status indicators
  - Filter options
  - Action buttons

#### `admin/src/pages/Doctor/DoctorDashboard.jsx`
- **Purpose:** Doctor's personal dashboard
- **What to change:**
  - Dashboard layout
  - Statistics cards
  - Charts display

#### `admin/src/pages/Doctor/DoctorAppointments.jsx`
- **Purpose:** Doctor's appointment list
- **What to change:**
  - Appointment list design
  - Status badges
  - Action buttons

#### `admin/src/pages/Doctor/DoctorProfile.jsx`
- **Purpose:** Doctor profile page
- **What to change:**
  - Profile layout
  - Form fields
  - Image upload area

---

## 🎨 Styling Approach

This project uses **Tailwind CSS** for styling. You'll see classes like:
- `bg-[#F8F9FD]` - Background colors
- `rounded-lg` - Border radius
- `shadow-md` - Shadows
- `flex`, `grid` - Layout
- `text-primary` - Text colors

### To Change Colors:
1. Check `admin/tailwind.config.js` for theme configuration
2. Or use inline Tailwind classes like `bg-blue-500`, `text-white`

### To Change Layout:
- Modify flex/grid classes in component files
- Adjust padding/margin with `p-4`, `m-2`, etc.

---

## 📝 Quick Reference: What to Edit for Common Changes

### Change Overall Theme/Colors:
- `admin/src/index.css` - Global styles
- `admin/tailwind.config.js` - Tailwind theme
- Individual component files - Inline Tailwind classes

### Change Navigation:
- `admin/src/components/Navbar.jsx` - Top bar
- `admin/src/components/Sidebar.jsx` - Side menu

### Change Page Layouts:
- `admin/src/App.jsx` - Overall structure
- Individual page files in `admin/src/pages/`

### Change Login Page:
- `admin/src/pages/Login.jsx`

### Change Dashboard:
- `admin/src/pages/Admin/Dashboard.jsx` - Admin dashboard
- `admin/src/pages/Doctor/DoctorDashboard.jsx` - Doctor dashboard

### Change Forms:
- `admin/src/pages/Admin/AddDoctor.jsx` - Add doctor form
- `admin/src/pages/Doctor/DoctorProfile.jsx` - Profile form

### Change Lists/Tables:
- `admin/src/pages/Admin/DoctorsList.jsx` - Doctors list
- `admin/src/pages/Admin/AllAppointments.jsx` - Appointments list
- `admin/src/pages/Doctor/DoctorAppointments.jsx` - Doctor appointments

---

## 🚀 Getting Started

1. **Start with layout:** Modify `App.jsx` for overall structure
2. **Update navigation:** Edit `Navbar.jsx` and `Sidebar.jsx`
3. **Style pages:** Modify individual page files
4. **Global styles:** Update `index.css` for site-wide changes

---

## 💡 Tips

- **Use Tailwind classes** for quick styling
- **Check existing components** to see styling patterns
- **Test changes** by running `npm run dev` in admin folder
- **Keep responsive design** in mind (use Tailwind responsive classes like `md:`, `lg:`)

---

## 📂 Assets

Icons and images are in:
- `admin/src/assets/` - SVG icons and images
- `admin/src/assets/assets.js` - Asset imports

To change icons, replace SVG files in the assets folder.



