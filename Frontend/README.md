This project is a full-stack web application designed to streamline the process of reserving courts at local parks, eliminating the need for individuals to physically visit each park to check court availability. The application leverages a queue-based data structure to manage reservations efficiently, ensuring a fair and transparent booking system for park-goers.

Frontend Development:
Technology Used: React.js
Functionality:
The frontend provides users with an intuitive interface to select a park and view the availability of its courts.
Users can easily choose a park, view the list of courts, and book a time slot directly through the application.
The interface updates in real-time, reflecting changes in availability as users book or cancel reservations.
A responsive design ensures seamless access across various devices, including desktops, tablets, and smartphones.
Backend Development:
Technology Used: Node.js with Express.js
Functionality:
The backend manages the data and logic for court reservations. Each park is represented by a collection of queues, where each queue corresponds to a specific court.
The system tracks the order of bookings for each court, ensuring that users can only book when the court is available.
An API facilitates communication between the frontend and backend, handling requests to book, view, or cancel reservations.
The application also includes robust error handling and validation to ensure data integrity and a smooth user experience.
Key Features:
Real-time Availability: Users can see up-to-date information on court availability without needing to refresh the page manually.
Queue Management: Each court operates as a queue, ensuring that reservations are processed in the order they are received. This prevents double bookings and allows for clear tracking of court usage.
User Notifications: The system can notify users of their booking status, confirmations, and cancellations, enhancing the overall user experience.
Scalable Architecture: The system is designed to handle multiple parks and courts, making it scalable for use in different communities or cities.
Project Impact:
This application significantly enhances the user experience for park-goers by providing a digital solution for reserving courts. It saves time and reduces the frustration of arriving at a park only to find that no courts are available. The use of modern web technologies ensures that the system is both efficient and easy to use, catering to a wide audience of users.

This project demonstrates proficiency in both frontend and backend development, showcasing the ability to build a full-stack application that addresses real-world needs with practical, user-friendly solutions.