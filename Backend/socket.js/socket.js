export const setupSockets = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // When new booking is created
    socket.on("newBooking", (booking) => {
      io.emit("receiveBooking", booking);
    });

    // When driver updates location
    socket.on("driverLocation", (data) => {
      io.emit("updateDriverLocation", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};