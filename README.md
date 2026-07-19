# Rental Car Booking Service

## Description
A modern, responsive web application designed to help users find and book their perfect rental car. Built with Next.js (App Router) and TypeScript, this project offers a seamless and highly interactive user experience—from browsing the vehicle catalog to submitting a validated booking request.

## Key Features
* **Interactive Car Catalog:** Browse through a comprehensive list of available rental cars.
* **Detailed Car Pages:** View specific information, images, and descriptions for each vehicle.
* **Smart Booking Form:** A custom-built booking form featuring floating labels and strict client-side validation without native browser tooltips.
* **Draft Saving (UX Optimized):** Form inputs are automatically saved to `localStorage`, ensuring users don't lose their data if they accidentally refresh the page.
* **Toast Notifications:** Clear visual feedback upon form submission using dynamically imported toast notifications.
* **SEO Optimized:** Static and dynamic metadata generation (OpenGraph) for the home page, catalog, and individual car pages.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** CSS Modules
* **Form Management & Validation:** Formik, Yup
* **Notifications:** iziToast (dynamically loaded)

## Live Demo
The application is successfully deployed and accessible online:
🚀 [**View Live Project**](https://rental-car-sable.vercel.app)

## Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/HalynaChuvaieva/rental-car.git](https://github.com/HalynaChuvaieva/rental-car.git)
   cd rental-car
2. **Install dependencies:**
    npm instal
3. **Start the development server:**
    npm run devl
4. **Open the application:**
    Navigate to http://localhost:3000 in your browser to see the result.

## Usage

1. **Browse the Catalog:** On the **Home Page**, click the "View Catalog" button to explore the available cars.
2. **Apply Filters:** Use the filtering options on the catalog page (e.g., by brand, price, or vehicle type) to quickly narrow down the search and find the exact car that meets your needs.
3. **View Details:** Select a specific car from the filtered list to open its dedicated page and view detailed specifications.
4. **Submit a Booking:** Fill out the "Book your car now" form. The form validation triggers only when you try to submit, ensuring a smooth, uninterrupted typing experience.
5. **Test Draft Saving:** Try reloading the page while filling out the form — your draft will be automatically restored from `localStorage`.
6. **Complete the Process:** Upon successful submission, a toast notification will appear confirming your request, and the form (along with the saved draft) will be fully cleared.

## Author

**GitHub: @HalynaChuvaieva**
**Linkedin: https://www.linkedin.com/in/halyna-chuvaieva**